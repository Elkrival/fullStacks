import React from 'react';

export default function DrawingsTable(props){
    return(
        <div className="col">
            <table className="table table-dark" >
                <thead>
                    <tr>
                    <th scope="col">Created</th>
                    <th scope="col">Total Drawing Time</th>
                    <th scope="col">User</th>
                    <th scope="col">Thumbnail</th>
                    </tr>
                </thead>
                <tbody>
                    {props.drawings.map(drawing =>{
                        const { src } = drawing;
                        debugger;
                        return (
                            <tr key={drawing._id}>
                                <td>{drawing.creationDate}</td>
                                <td>{drawing.elapsedTime}</td>
                                <td>{drawing.email}</td>
                                <td><img src={`${drawing.src}`} className="img-fluid" alt="Responsive image" /></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}