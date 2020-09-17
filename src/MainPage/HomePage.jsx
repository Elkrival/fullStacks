import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import  DrawingsTable  from '../Drawings/DrawingsTable'
import { toast } from 'react-toastify';

export default function HomePage(){
    const history = useHistory();
    const [drawings, setDrawings] = useState([])
    const goToMemberArea = () =>{
        return history.push('/member-page')
    }
    useEffect(() => {
        getHomePageDrawings()
    }, [])
    const getHomePageDrawings = () =>{
        const options = {
            method: 'GET',
            headers: {
              'Content-Type': "application/json",
            }
          }
        fetch('home-page', options).then(res => res.json()).then(data =>{
            if(data.success) {
                setDrawings(data.drawings)
            } else {
                toast.error('🦄 There was a problem looking....', {
                    position: toast.POSITION.BOTTOM_CENTER,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        })
    }
    return(
        <div className="container-fluid">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="row">
                    <div className="col">
                        <button onClick={() => goToMemberArea()} type="submit" className="btn btn-primary">Member Area</button>
                    </div>
                </div>
            </nav>
            <div className="row align-items-center">
            </div>
            <div className="row">
                <DrawingsTable drawings={drawings} showDeleteColumn={false} isPublic={true}/>            
            </div>
        </div>
    )
}