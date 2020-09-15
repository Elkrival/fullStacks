import React, { useState, useContext } from 'react';


export default React.forwardRef(function SubmitDrawing(props, ref) {
    const [imageData, setImageData] = useState();
    const [isPrivate, setPrivate] = useState(false);
    const [imageName, setImageName] = useState('');
    const handleSubmit = (e) => {
        setImageData(props.canvas().toDataURL())
        console.log(imageData)
        const options = {
            method: 'POST',
            body: JSON.stringify({ isPrivate, image: imageData, imageName }),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        return fetch('save-drawing', options).then(res => res.json()).then(data => console.log(data))
    }
    const preparePrivate = () =>{
        setPrivate(true)
        // const reader = new FileReader();
        // reader.onload = function(event){
        //     console.log(event.target.result)
        //     setImageData(event.target.result)
        // }
        
        // props.canvas().toBlob(function(blob) {
        //     reader.readAsDataURL(blob);
        // })
    }
    const preparePublic = () =>{
        setPrivate(false)
    }
    const handleName = (e) =>{
        setImageName(e.target.value)
    }
    return(
        <div className="col">
            <div className="card">
                <div className="card-body">
                    <div className="row">
                        <div className="col">
                        <form>
                            <div className="form-group">
                                <label for="nameInput">Enter a name</label>
                                <input type="text" className="form-control" id="nameInput" placeholder="Name your drawing" onChange={e => handleName(e) }/>
                            </div>
                        </form>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col py-2">
                            <div style={{padding: '1rem'}}>
                                <button onClick={preparePublic} className="btn btn-primary">Public</button>
                            </div>
                            <div style={{padding: '1rem'}}>
                                <button onClick={preparePrivate}className="btn btn-primary">Private</button>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col py-2">
                            <button className="btn btn-primary" onClick={(e) => handleSubmit(e)}>Post Your Drawing 👍🏽</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
})