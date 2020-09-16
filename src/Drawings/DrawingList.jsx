import React, { useEffect, useState } from 'react';
import DrawingsTable from './DrawingsTable';

function DrawingList() {
  const [drawingsList, setDrawings] = useState([])
  const token = localStorage.getItem('token')
  useEffect(() =>{
    getPrivateDrawings()
}, [])
  const getPrivateDrawings = () =>{
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': "application/json",
        "Authorization": `Bearer ${token}`
      }
    }
    fetch('user-drawings', options).then(res => res.json()).then(data => { 
        setDrawings(data.drawings)
      })
  }
  return (
    <div className="container">

      <div className="row">
        <DrawingsTable drawings={drawingsList} />
      </div>
       
    </div>
  );
}

export default DrawingList;