import React, { useEffect, useState } from 'react';
import DrawingsTable from './DrawingsTable';

function DrawingList() {
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
        }
    })

  }
  return (
    <div className="container">
      <div class="row align-items-center">
        <div class="col">
          <h3>Your Private Drawings</h3>
        </div>
      </div>
      <div className="row">
        <DrawingsTable drawings={privateDrawings} deleteDrawing={deleteDrawing} />
      </div>
      <div class="row align-items-center">
        <div class="col">
          <h3>Your Public Drawings</h3>
        </div>
      </div>
      <div className="row">
        <DrawingsTable drawings={publicDrawings} deleteDrawing={deleteDrawing} />
      </div>
       
    </div>
  );
}

export default DrawingList;