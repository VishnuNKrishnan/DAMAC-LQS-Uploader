import { useState } from 'react';
import './App.css';
import Dashboard from './Components/Dashboard';
import LeadDetailsCard from './Components/LeadDetailsCard';
import axios from 'axios'
import Papa from 'papaparse'
import LoaderRing from './Components/LoaderRing';
 

function App() {

  const [file, setFile] = useState()
  const [leadsFromCSV, setLeadsFromCSV] = useState([])
  const [leadCount, setLeadCount] = useState(0)
  const [uploadedCount, setUploadedCount] = useState(0)
  const [lqsMessage, setLqsMessage] = useState("")
  const [fileLoaded, setFileLoaded] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleCSVUpload = e => {
    setLeadCount(0)
    setUploadedCount(0)
    setLqsMessage('')
    let file = e.target.files[0];
    setFile(file)
    // console.log(file);

    if (file) {
      setFileLoaded(true)
    }

    Papa.parse(e.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        var leadsArray = []
        results.data.map(obj=>{
          leadsArray.push(obj)
        })
        setLeadsFromCSV(leadsArray)
        
        setLeadCount(results.data.length)
      },
    });
  }
  
  const handleSubmit = (event) => {
    event.preventDefault()
    setIsLoading(true)
    const url = 'https://lqsapp.damacgroup.com/api/importedleads';
    const config = {
      headers: {
        'content-type': 'application/json',
        'Authorization': 'EkbAZr6choTaIdy2pVSRa9niMRydZaZA'
      },
    };

    leadsFromCSV.forEach((obj, index) => {
      axios.post(url, obj, config).then((response) => {
        console.log(response.data);
        setLqsMessage((response.data.message).toUpperCase())
        setUploadedCount(index)
      });
    })

    // for(var i = 0; i < leadsFromCSV.length; i++){
    //   axios.post(url, leadsFromCSV[i], config).then((response) => {
    //     console.log(response.data);
    //     setLqsMessage((response.data.message).toUpperCase())
    //     setUploadedCount(i)
    //   });
    // }
    setIsLoading(false)
  }

  return (
    <div className="App">
      <h2>PUSH TO LQS</h2>
      <form className='dashboardHolder' onSubmit={handleSubmit}>
        <h3>Upload CSV File</h3>
        <input type="file" name="" id="" accept='.csv' onChange={handleCSVUpload}/>
        {fileLoaded && !isLoading && <button>Send to Salesforce!</button>}
        {isLoading && <LoaderRing />}
      </form>
      <LeadDetailsCard 
        leadCount={leadCount}
        uploadedCount={uploadedCount}
        totalCount={leadCount}
        lqsMessage={lqsMessage}
      />
    </div>
  );
}

export default App;
