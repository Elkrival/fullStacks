import React, { useContext } from 'react';
import { ColorContext } from "./DrawingPad";
import Eraser from './Eraser';

export default function Options(props) {
    const { dispatch } = useContext(ColorContext);
    const changeColorValue = (color) => {
        dispatch({ type: 'UPDATE_COLOR', data: color,});
    };
    const changeLineWidthValue = (lineWidth) =>{
        dispatch({ type: 'UPDATE_LINE_WIDTH', data: { lineWidth }});
    }
    return(
        <div className="col">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Select color and width of pencil.</h5>
                    <p className="card-text">Click on the followint options.</p>
                    
                    <div class="row">
                        <div class="col">
                            {props.colors.map(({ color,rgba }) =>{
                                return(
                                    <ul className="list-group" key={rgba.join(',')} onClick={e => changeColorValue({ color, rgba })}>
                                        <li className="list-group-item d-flex justify-content-between align-items-center">
                                            {color}
                                            <span>
                                                <div style={{ 
                                                    height: "25px", 
                                                    width: "25px", 
                                                    backgroundColor: 
                                                    `rgba(${ rgba.join(',') })`, 
                                                    borderRadius: "50%", 
                                                    display: 'inline-block' }}
                                                    >
                                                </div>
                                            </span>
                                        </li>
                                    </ul>
                                )
                                    
                            })}
                        </div>
                        <div class="col">
                            {props.lineWidths.map((width) =>{
                                return(
                                    <ul className="list-group" key={width} onClick={() => changeLineWidthValue(width)}>
                                        <li className="list-group-item d-flex justify-content-between align-items-center">
                                            { width }
                                        </li>
                                    </ul>)
                                })}
                        </div>
                        <div class="col">
                                <Eraser />
                        </div>
                    </div>    
                </div>
            </div>
        </div>
    )
}