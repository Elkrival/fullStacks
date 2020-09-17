import React, {useReducer, useRef} from 'react'
import WhiteBoard from './WhiteBoard'
import Options from './Options'
import SubmitDrawing from './SubmitDrawing'

const colors = [
    { color:"aliceblue", rgba: [240, 248, 255, 1] },
    { color:"antiquewhite", rgba: [250, 235, 215, 1] },
    { color:"aqua", rgba: [0, 255, 255, 1] },
    { color:"aquamarine", rgba: [127, 255, 212, 1] },
    { color:"azure", rgba: [240, 255, 255, 1] },
    { color:"beige", rgba: [245, 245, 220, 1] },
    { color:"bisque", rgba: [255, 228, 196, 1] },
    { color:"black", rgba: [0, 0, 0, 1] },
    { color:"blanchedalmond", rgba: [255, 235, 205, 1] },
    { color:"blue", rgba: [0, 0, 255, 1] },
    { color:"blueviolet", rgba: [138, 43, 226, 1] },
    { color:"brown", rgba: [165, 42, 42, 1] },
    { color:"burlywood", rgba: [222, 184, 135, 1] },
    { color:"cadetblue", rgba: [95, 158, 160, 1] },
    { color:"chartreuse", rgba: [127, 255, 0, 1] },
    { color:"chocolate", rgba: [210, 105, 30, 1] },
    { color:"coral", rgba: [255, 127, 80, 1] },
]
const lineWidths = [5, 10, 15, 20, 25, 30]
export const ColorContext = React.createContext()
const initialState = {
    color: 'black',
    rgba: [0, 0, 0, 1],
    lineWidth: 5
}
export default function DrawingPad(props){
    const canvasRef = useRef(null)
    const contextRef = useRef(null);
    const [state, dispatch] = useReducer(reducer, initialState);
    const getCanvas = () => { return canvasRef.current }
    return(
        <div className="container-fluid">
            <div className="row">
                <div className="col">
                <h1>Start Your Draws, Get Set Go</h1>
            </div>
            </div>
            <div className="row">
                <div className="col">
                    <WhiteBoard ref={{ canvasRef, contextRef }} brush={ state.color } lineWidth={ state.lineWidth } setCreationDate={ props.setCreationDate }/>
                </div>
            </div>
            <div className="row">
                <ColorContext.Provider value={{ state, dispatch }}>
                    <Options colors={ colors } lineWidths={ lineWidths }/>
                    <SubmitDrawing ref={{ canvasRef, contextRef }} canvas={getCanvas} creationDate={ props.creationDate }/>
                </ColorContext.Provider>
            </div>
        </div>
    )
}
function reducer(state, action) {
    switch (action.type) {
        case 'UPDATE_COLOR':
            return {
                color: action.data.rgba.join(',')
            };

        case 'UPDATE_LINE_WIDTH':
            return {
                lineWidth: action.data.lineWidth
            }
        default:
            return initialState;
    }
}