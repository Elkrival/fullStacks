import dotenv from 'dotenv'
import express from "express";
import cors from "cors";
import jsonwebtoken  from 'jsonwebtoken';
import path from 'path';
import { writeFile, readFile } from 'fs/promises'
import { fileURLToPath, pathToFileURL } from 'url';
import { default as mongodb } from 'mongodb';



/*
    PathToFileURL Will use this to store in the database and it will read from the server
*/

dotenv.config()
const DIR = fileURLToPath(import.meta.url).split('/').slice(0, -1).join('/')
console.log(DIR)
// const API_DIRECTORY = 
const PORT = process.env.PORT || 8080;


const app = express()
let DB;

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true}));
app.use(cors());

app.get(`/api`, async(req,res) =>{
    try {
        return res.json({ message: "We are in."})
    } catch (error) {
        return res.json({ message: e.message })
    }
})
app.get(`/api/login`, async(req,res) =>{
    // const { username, password } = req.body

    try {
        const token = await generateAccessToken();
        return res.json(token);
    } catch (error) {
        
    }

})
app.get('/api/user-drawings', authenticateToken, async(req, res) =>{

})
app.post('/api/save-drawing', async(req, res) => {
    const { isPrivate, imageName, image } = req.body;
    const DB = await startDB();
    
    try {
        return await saveDrawing()
    } catch (error) {
        console.error(error)
        return res.json({ error: error.message, status: 401 })
    }
    async function saveDrawing(){
        try {
            const base64Data = image.replace(/^data:image\/png;base64,/, "")
            let filePath = path.join(DIR, 'image_files', imageName + '.jpeg')
            const base64ToBuffer = new Buffer.from(base64Data, 'base64');
            await writeFile(filePath, base64ToBuffer)

            return res.status(200).json({ message: "HIt the route."})
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
      message: err.message
    });
});
function authenticateToken(req, res, next) {
   const authHeader = req.headers[`authorization`]
   const token = authHeader && authHeader.split(' ')[1];
   if (token === null)  return res.sendStatus(401)
   jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) =>{
       if (err) return res.sendStatus(403)
        req.user = user
        next()
   })

}

app.listen(PORT, function () {
    console.log('listen to events on a "port: ', PORT)
});

async function generateAccessToken() {
    // expires after half and hour (1800 seconds = 30 minutes)
    return jsonwebtoken.sign({username: "user"}, process.env.ACCESS_TOKEN, { expiresIn: '1800s' });
}
/**
 * 
 * 
 mongo --port 27017  --authenticationDatabase "admin" -u "myUserAdmin" -p "andRes1993"
 */

 async function startDB(){
    try {
        const uri = "mongodb://localhost:27017/drawings";
        const MongoClient = new mongodb.MongoClient(uri)
        const client = await MongoClient.connect()
        DB = client
    return client
    }catch(e) {
        console.error(e.message)
        return e.message
    }
 }