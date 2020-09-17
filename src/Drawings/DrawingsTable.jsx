import React from 'react';
import * as dfns from 'date-fns'

export default function DrawingsTable(props){
    return(
        <div className="col">
            <table className="table table-stripped table-responsive{-sm|-md|-lg|-xl}" >
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">Created</th>
                        <th scope="col">Total Drawing Time in Seconds</th>
                        <th scope="col">User</th>
                        <th scope="col">Thumbnail</th>
                        {props.showDeleteColumn 
                        ? <th scope="col">Delete</th>
                        : null}
                        {props.isPublic 
                            ? null
                            : <th scope="col">Share URL</th>}
                    </tr>
                </thead>
                <tbody>
                    {props.drawings.map(drawing =>{
                        const isoToDate = dfns.parseISO(drawing.creationDate)      
                        const dateToSimpleFormat = dfns.format(isoToDate, 'MM/dd/yyyy')
                        return (
                            <tr key={drawing._id}>
                                <td>{dateToSimpleFormat}</td>
                                <td>{drawing.elapsedTime + 's'}</td>
                                <td>{drawing.email}</td>
                                <td style={{width: '25%', height: '25%'}}><img src={`${drawing.src}`} className="img-fluid" alt="super awesome drawing" /></td>
                                <td><button type="button" class="btn btn-outline-danger" onClick={() => props.deleteDrawing({_id: drawing._id, isPrivate: drawing.isPrivate})}>Delete</button></td>
                                { drawing.isPrivate 
                                    ? <td><button type="button" class="btn btn-outline-warning" onClick={() => props.shareUrl({ _id: drawing._id })}>Share URL</button></td>
                                    : null }
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}