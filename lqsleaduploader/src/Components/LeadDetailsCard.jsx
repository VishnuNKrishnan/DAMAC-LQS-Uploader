import React from 'react'
import './LeadDetailsCard.css'

function LeadDetailsCard(props) {
  return (
    <div className='leadCard'>
        <table className='leadDetailsTable'>
            <tr>
                <td className="heading"><p>Total leads in file:</p></td>
                <td><p> {props.leadCount}</p></td>
            </tr>
            <tr>
                <td className="heading"><p>Current Status:</p></td>
                <td>{props.leadCount > 0 ? <p> {props.uploadedCount} out of {props.totalCount} processed...</p> : <p>Idle</p>}</td>
            </tr>
            <tr>
                <td className="heading"><p>Message from LQS:</p></td>
                <td><p> {props.lqsMessage}</p></td>
            </tr>
        </table>
    </div>
  )
}

export default LeadDetailsCard
