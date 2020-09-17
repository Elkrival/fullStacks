import dotenv from 'dotenv'
import express from "express";
import cors from "cors";
import jsonwebtoken  from 'jsonwebtoken';
import path from 'path';
import bcrypt from 'bcrypt';
import { writeFile, unlink, stat } from 'fs/promises'
import { fileURLToPath, pathToFileURL } from 'url';
import { default as mongodb } from 'mongodb';
import { resolveSoa } from 'dns';
const saltRounds = 10;

dotenv.config()
const DIR = fileURLToPath(import.meta.url).split('/').slice(0, -2).join('/')
// const API_DIRECTORY = 
const PORT = process.env.PORT || 8080;
const ObjectId = mongodb.ObjectId

const app = express()

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true}));
app.use(cors());

app.post(`/api/login`, async(req,res) =>{
    const { email, password } = req.body
    try {
        return await login()
    } catch (error) {
        console.error(error.stack)
        return res.json({ message: e.message })
    }
    async function login() {
        const DB_CLIENT = await startDB();
        const db = await DB_CLIENT.db('drawings')
        const collection = db.collection('users')
        const user = await collection.findOne({ "email": email })
        const doPasswordsMatch = await bcrypt.compare(password, user.password)
        DB_CLIENT.close()
        if(doPasswordsMatch) {
            const token = await generateAccessToken(user);
            return res.status(200).json({ token, user })
        } else {
            return res.status(401).json({ message: "Passwords do not match."})
        }
    }
})
app.post(`/api/register`, async(req,res) =>{
    const { email, password } = req.body
    try {
        const result = await insertUser()
        return result
    } catch (error) {
        console.error(error.stack)
        return res.json({ message: e.message })
    }
    async function insertUser() {
        const DB_CLIENT = await startDB();
        const db = await DB_CLIENT.db('drawings')
        const collection = db.collection('users')
        let hash = await bcrypt.hash(password, saltRounds)
        const user = await collection.insertOne({ email, password: hash })
        const token = await generateAccessToken(user.ops[0]);
        return res.status(200).json({token, email: user.ops[0].email})
    }
})
app.get('/api/user-public-drawings', authenticateToken, async(req, res) =>{
    try {
        const { email } = req.user
        const drawings = await getUserDrawings(email, false)
        return res.status(200).json({ drawings })
    } catch (e) {
        console.error(e.stack)
        return res.status(401).json({ message: e.message, error: true })
    }
})
app.get('/api/user-private-drawings', authenticateToken, async(req, res) =>{
    try {
        const { email } = req.user
        const drawings = await getUserDrawings(email, true)
        return res.status(200).json({drawings })
    } catch (e) {
        console.error(error.stack)
        return res.status(401).json({ message: e.message, error: true })
    }
})
app.delete('/api/delete-drawing/:_id', authenticateToken, async(req,res) =>{
    try {
        const result = await deleteUserDrawing();
        return result
    } catch (error) {
        console.error(error.stack)
        return res.status(400).json({ message: "There was an internal problem.", deleted: false })
    }
    async function deleteUserDrawing(){
        const { _id } = req.params;
        const DB_CLIENT = await startDB();
        const db = await DB_CLIENT.db('drawings')
        const drawings = db.collection('drawings')
        let drawing = await drawings.findOne({ _id: ObjectId(_id) });
        let fileToDelete = path.join(DIR, "public", drawing.src)
        await unlink(fileToDelete)
        if(stat(fileToDelete).size > 0) return res.status(500).json({ deleted: false})
        let isDeleted = await drawings.deleteOne({ _id: ObjectId(_id)})

        if(isDeleted.result.ok === 1 && isDeleted.deletedCount === 1) {
            return res.status(200).json({ deleted: true })
        }
        return res.status(403).json({ deleted: false })
    }
})
app.post('/api/save-drawing',authenticateToken, async(req, res) => {
    const { isPrivate, imageName, image, creationDate, elapsedTime } = req.body;
    
    const DB_CLIENT = await startDB();
    const db = await DB_CLIENT.db('drawings')
    const drawings = db.collection('drawings')
    const users = db.collection('users')
    try {
        return await saveDrawing()
    } catch (error) {
        console.error(error.stack)
        return res.json({ error: error.message, status: 401 })
    }
    async function saveDrawing(){
        try {
            if(image) {
                const base64Data = image.replace(/^data:image\/png;base64,/, "")
                const filePath = path.join('images', imageName + '.jpeg')
                const pathToWrite = path.join(DIR, 'public', 'images', imageName + '.jpeg')
                const base64ToBuffer = new Buffer.from(base64Data, 'base64')
                await writeFile(pathToWrite, base64ToBuffer)
                const getUser = await users.findOne({ email: req.user.email });
                const drawing = await drawings.insertOne({ "email": getUser.email ,"src": filePath, "isPrivate": isPrivate, "user": getUser._id, "creationDate": creationDate, "elapsedTime": elapsedTime })
                if (drawing.result.ok === 1) {
                    return res.status(200).json({ message: "Drawing added." })
                }
                return res.status(400).json({ message: "There is a problem.", error: true})
            } else {
                return res.status(400).json({ message: "Image not in the right format", error: true},)
            }
        } catch(e) {
            console.error(e.stack)
            return res.json({ message: e.message })
        }
    }
})
app.use(async(err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
  
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      error: true
    });
});
function authenticateToken(req, res, next) {
   const authHeader = req.headers[`authorization`]
   const token = authHeader && authHeader.split(' ')[1];
   if (token === null)  return res.sendStatus(401)

    jsonwebtoken.verify(token, process.env.ACCESS_TOKEN, (err, user) =>{
       if (err) return res.sendStatus(403)
        req.user = user
        next()
    })

}

app.listen(PORT, function () {
    console.log('listen to events on a "port: ', PORT)
});

async function generateAccessToken(user) {
        return jsonwebtoken.sign({ email: user.email }, process.env.ACCESS_TOKEN, { expiresIn: '24h' });
}

 async function startDB(){
    try {
        const uri = "mongodb://localhost:27017/drawings";
        const MongoClient = new mongodb.MongoClient(uri)
        const client = await MongoClient.connect()
        return client
    }catch(e) {
        console.error(e.message)
        return e.message
    }
 }
 async function getUserDrawings(email, isPrivate){
    const DB_CLIENT = await startDB();
    const db = await DB_CLIENT.db('drawings')
    const drawings = db.collection('drawings')
    const users = db.collection('users');
    const user = await users.findOne({ email })
    const usersDrawings = await drawings.find({ user: user._id, isPrivate })
    return await usersDrawings.toArray()
}