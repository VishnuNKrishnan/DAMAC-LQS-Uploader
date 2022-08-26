import React from 'react'
import './Dashboard.css'

function Dashboard() {
  return (
    <div className='dashboardHolder'>
      <h3>Upload CSV File</h3>
      <input type="file" name="" id="" accept='.csv' />
      <button>Send to Salesforce!</button>
    </div>
  )
}

export default Dashboard
