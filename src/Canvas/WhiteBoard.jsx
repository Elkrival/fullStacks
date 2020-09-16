import React, { useEffect, useState } from "react";
import { formatISO } from 'date-fns';

export default React.forwardRef(function WhiteBoard(props, ref){
    const { canvasRef, contextRef } = ref; 
    //This gives us access to the canvas dom element
    const [isDrawing, setIsDrawing] = useState(false);
    //This is the state that tracks if the user is currently drawing

    useEffect(() =>{
        const canvas = canvasRef.current;
        canvas.width = window.innerWidth * 2;
        canvas.height = window.innerHeight * 1.75;
        canvas.style.width = `${window.innerWidth}px`;
        canvas.style.height = `${window.innerHeight}px`;

        const context = canvas.getContext("2d");
        context.scale(2,2);
        context.lineCap = "round"
        context.strokeStyle = `rgba(${props.brush})`
        context.lineWidth = 5
        contextRef.current = context;
    }, [])

    /*
    ==================================
    Creates canvas and sets it to the properties of the type of display
    the user has. If it has a retina display then it will display a much denser 
    image
    */

    const startDrawing = ({nativeEvent}) =>{
        const { offsetX, offsetY } = nativeEvent;
        contextRef.current.strokeStyle = `rgba(${props.brush})`
        contextRef.current.lineWidth = props.lineWidth;

        contextRef.current.beginPath();
        contextRef.current.moveTo(offsetX, offsetY)
        contextRef.current.lineTo(offsetX, offsetY)
        setIsDrawing(true)
        const startTime = formatISO(new Date())
        props.setCreationDate(startTime)
    }
    const finishDrawing = () =>{
        contextRef.current.closePath()
        setIsDrawing(false)
    }
    const draw = ({nativeEvent}) =>{
        if(!isDrawing) return 
        const { offsetX, offsetY } = nativeEvent;
        contextRef.current.lineTo(offsetX, offsetY)
        contextRef.current.stroke()
    }
    return(
        <div className="card">
            <div className="card-body">
                <canvas
                    onMouseDown={startDrawing}
                    onMouseUp={finishDrawing}
                    onMouseMove={draw}
                    ref={canvasRef}
                />
            </div>
        </div>
    )
})
