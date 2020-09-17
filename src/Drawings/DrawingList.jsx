import React, { useEffect, useState } from 'react';
import DrawingsTable from './DrawingsTable';
import { toast } from 'react-toastify';

export default function DrawingList() {
  const [publicDrawings, setPublicDrawings] = useState([])
  const [privateDrawings, setPrivateDrawings] = useState([])
  const token = localStorage.getItem('token')
  useEffect(() =>{
    getPublicDrawings()
    getPrivateDrawings()
  }, [])  
  const getPublicDrawings = () =>{
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': "application/json",
        "Authorization": `Bearer ${token}`
      }
    }
    fetch('user-public-drawings', options).then(res => res.json()).then(data => { 
        setPublicDrawings(data.drawings)
      })
  }
  const getPrivateDrawings = () =>{
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': "application/json",
        "Authorization": `Bearer ${token}`
      }
    }
    fetch('user-private-drawings', options).then(res => res.json()).then(data => { 
        setPrivateDrawings(data.drawings)
      })
  }
  const deleteDrawing = ({_id, isPrivate}) =>{
    const options = {
      method: "DELETE",
      headers: {
        'Content-Type': "application/json",
        "Authorization": `Bearer ${token}`
      }
    }
    fetch(`delete-drawing/${_id}`, options).then(res => res.json()).then(data => {
        if(data.deleted) {
            if(isPrivate) {
              getPrivateDrawings()
            } else {
              getPublicDrawings()
            }
        } else {
          toast('🦄 There was a problem deleting your drawing.', {
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
    const shareUrl = (_id) =>{
      const options = {
        method: "POST",
        headers: {
          'Content-Type': "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(_id)
      }
      fetch(`share-url`, options).then(res => res.json()).then(data => {
        if(data.success) {
          toast.info('URL has been shared. 🛫', {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            }); 
        } else {
          toast('🦄 There was a problem deleting your drawing.', {
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
  return (
    <div className="container-fluid">
      <div class="row align-items-center">
        <div class="col">
          <h3>Your Private Drawings</h3>
        </div>
      </div>
      <div className="row">
        <DrawingsTable drawings={privateDrawings} deleteDrawing={deleteDrawing} shareUrl={shareUrl} isPublic={false}/>
      </div>
      <div class="row align-items-center">
        <div class="col">
          <h3>Your Public Drawings</h3>
        </div>
      </div>
      <div className="row">
        <DrawingsTable drawings={publicDrawings} deleteDrawing={deleteDrawing} isPublic={true}/>
      </div>
       
    </div>
  );
}
