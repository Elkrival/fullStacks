import React, { useState } from 'react';
import * as dateFns from 'date-fns'
import { toast } from 'react-toastify';

export default React.forwardRef(function SubmitDrawing(props, ref) {
    const [imageData, setImageData] = useState();
    const [isPrivate, setPrivate] = useState(false);
    const [imageName, setImageName] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const { creationDate } = props;
        const elapsedTime = dateFns.differenceInSeconds( dateFns.parseISO(dateFns.formatISO(new Date())) , dateFns.parseISO(creationDate))
        const options = {
            method: 'POST',
            body: JSON.stringify({ isPrivate, image: imageData, imageName, creationDate: creationDate, elapsedTime }),
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        }
        fetch('http://localhost:8080/api/save-drawing', options).then(res => res.json()).then(data => {
            if(data.error) {
                toast('🦄 There was a problem saving your art.', {
                    position: toast.POSITION.BOTTOM_CENTER,
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
                    
            }
        })
    }
    const preparePrivate = () =>{
        setPrivate(true)
        setImageData(props.canvas().toDataURL())
    }
    const preparePublic = () =>{
        setPrivate(false)
        setImageData(props.canvas().toDataURL())
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
                                <label htmlFor="nameInput">Enter a name</label>
                                <input type="text" className="form-control" id="nameInput" placeholder="Name your drawing" onChange={e => handleName(e) }/>
                            </div>
                        </form>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col py-2">
                            <div style={{padding: '1rem'}}>
                                <button onClick={preparePublic} className="btn btn-primary">Public</button>
                            </div>
                            <div style={{padding: '1rem'}}>
                                <button onClick={preparePrivate}className="btn btn-primary">Private</button>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col py-2">
                            <button className="btn btn-primary" onClick={(e) => handleSubmit(e)}>Post Your Drawing <span role="img" aria-label="thumbs-up">≈👍🏽</span></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
})