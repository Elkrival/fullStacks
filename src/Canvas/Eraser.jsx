import React, { useContext } from 'react';
import { ColorContext } from "./DrawingPad";

export default function Eraser() {
    const { dispatch} = useContext(ColorContext);
    const eraserSetting = (eraser) =>{
        dispatch({ type: 'UPDATE_COLOR', data: eraser })
    }
    return(
        <ul className="list-group" onClick={e => eraserSetting({ color: 'eraser', rgba: [255,255,255,1] })}>
            <li className="list-group-item d-flex justify-content-between align-items-center">
                                   Eraser
                <span>
                    <div style={{ 
                                    height: "25px", 
                                    width: "25px", 
                                    backgroundColor: `rgba(255, 255, 255, 1)`, 
                                    borderRadius: "50%", 
                                    display: 'inline-block',
                                    border: 'solid black 1px'
                                }}
                    >
                    </div>
                </span>
            </li>
        </ul>
    )
}