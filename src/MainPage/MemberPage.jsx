import React, { useState, useReducer, useEffect } from 'react';
import DrawingList from '../Drawings/DrawingList';
import DrawingPad from '../Canvas/DrawingPad';
import { useHistory } from 'react-router-dom';

export const DrawingListContext = React.createContext();
const initialState = {
    drawings: [{ src: 'image goes here' }],
}
function MemberPage() {
    const history = useHistory();
    const [state, dispatch] = useReducer(reducer, initialState)
    const [creationDate, setCreationDate ] = useState('')
    const [showPad, setShowPad] = useState(false);
    const [email, setEmail] = useState('');
    useEffect(() => {
        const getEmail = localStorage.getItem('email');
        setEmail(getEmail)
    }, [])
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
          return <DrawingList />;
    }
    const goToHomePage = () =>{
        return history.push('/home-page')
    }
  return (
    <div>

        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="col">
                <div className="row">
                    <div className="col col-md-3">
                        <button onClick={() => showGallery()} type="submit" className="btn btn-primary">Gallery</button>
                    </div>
                    <div className="col col-md-3">
                        <h2> Welcome {email}</h2>
                    </div>
                    <div className="col col-md-3">
                        <button onClick={() => createDrawing()} type="submit" className="btn btn-primary">Make More</button>
                    </div>
                    <div className="col col-md-3">
                        <button onClick={() => goToHomePage()} type="submit" className="btn btn-primary">Home Page</button>
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

export default MemberPage;