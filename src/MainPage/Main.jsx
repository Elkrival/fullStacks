import React, { useState, useReducer } from 'react';
import DrawingList from '../Drawings/DrawingList';
import DrawingPad from '../Canvas/DrawingPad';

export const DrawingListContext = React.createContext();
const initialState = {
    drawings: [{ src: 'image goes here' }],
}
function Main() {
    const [state, dispatch] = useReducer(reducer, initialState)
    const [creationDate, setCreationDate ] = useState('')
    const [showPad, setShowPad] = useState(false);
    const showGallery = () => {
        return setShowPad(false)
    }
    const createDrawing = () =>{
        setShowPad(true)
    }
    const renderComponent = () =>{
        if (showPad) {
            return <DrawingPad setCreationDate={setCreationDate} creationDate={creationDate}/>;
          }
          return <DrawingList drawings={state.drawings} />;
    }
  return (
    <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div className="col">
                <div class="row">
                    <div class="col">
                        <button onClick={() => showGallery()} type="submit" className="btn btn-primary">Gallery</button>
                    </div>
                    <div class="col">
                        <button onClick={() => createDrawing()} type="submit" className="btn btn-primary">Make More</button>
                    </div>
                </div>
            </div>
        </nav>
        <div>
            <DrawingListContext.Provider value={state, dispatch} >
                { renderComponent()}
            </DrawingListContext.Provider>
        </div>
    </div>
  );
}
function reducer(state, action) {
    switch (action.type) {
        default:
            return initialState;
    }
}

export default Main;