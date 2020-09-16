import React from 'react';
import * as dfns from 'date-fns'
export default function DrawingsTable(props){
    return(
        <div className="col">
            <table className="table table-stripped table-responsive{-sm|-md|-lg|-xl}" >
                <thead className="thead-dark">
                    <tr>
                    <th scope="col">Created</th>
                    <th scope="col">Total Drawing Time</th>
                    <th scope="col">User</th>
                    <th scope="col">Thumbnail</th>
                    </tr>
                </thead>
                <tbody>
                    {props.drawings.map(drawing =>{
                        const isoToDate = dfns.parseISO(drawing.creationDate)      
                        const dateToSimpleFormat = dfns.format(isoToDate, 'MM/dd/yyyy')
                        return (
                            <tr key={drawing._id} scope="row">
                                <td>{dateToSimpleFormat}</td>
                                <td>{drawing.elapsedTime}</td>
                                <td>{drawing.email}</td>
                                <td style={{width: '25%', height: '25%'}}><img src={`${drawing.src}`} className="img-fluid" alt="super awesome drawing" /></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}