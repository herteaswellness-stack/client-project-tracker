import { useState, useEffect } from "react";

const API_URL =
"https://script.google.com/macros/s/AKfycbxibbpIH6hK562rdDqPGZh8owOS77Go5YBt0-ody_eItTp8LyNHuA8Z4eNjpugpa0FWkg/exec";

export default function App() {

const [clients,setClients] = useState([]);

const [form,setForm] = useState({

dateRcvd:"",
lastName:"",
firstName:"",
address:"",
phone:"",
firstVisit:"",
feasibilityReport:"",
contractDate:"",
contractor:"",
estStart:"",
firstInterim:"",
secondInterim:"",
thirdInterim:"",
finalDate:"",
statusRemark:""

});

function handleChange(e){

setForm({

...form,
[e.target.name]:e.target.value

})

}

async function addClient(){

await fetch(API_URL,{

method:"POST",

body:JSON.stringify(form)

})

alert("Saved to Google Sheet!")

}

return (

<div style={{maxWidth:500,margin:"auto"}}>

<h1>Client Project Tracker</h1>

<h2>Add Client</h2>

<label>Date RCVD</label>
<input type="date" name="dateRcvd" onChange={handleChange}/>

<label>Last Name</label>
<input name="lastName" onChange={handleChange}/>

<label>First Name</label>
<input name="firstName" onChange={handleChange}/>

<label>Address</label>
<input name="address" onChange={handleChange}/>

<label>Phone</label>
<input name="phone" onChange={handleChange}/>

<label>1st Visit</label>
<input type="date" name="firstVisit" onChange={handleChange}/>

<label>Feasibility Report</label>
<input type="date" name="feasibilityReport" onChange={handleChange}/>

<label>Contract Date</label>
<input type="date" name="contractDate" onChange={handleChange}/>

<label>Contractor</label>
<input name="contractor" onChange={handleChange}/>

<label>Est Start</label>
<input type="date" name="estStart" onChange={handleChange}/>

<label>1st Interim</label>
<input type="date" name="firstInterim" onChange={handleChange}/>

<label>2nd Interim</label>
<input type="date" name="secondInterim" onChange={handleChange}/>

<label>3rd Interim</label>
<input type="date" name="thirdInterim" onChange={handleChange}/>

<label>Final</label>
<input type="date" name="finalDate" onChange={handleChange}/>

<label>Status Remark</label>
<input name="statusRemark" onChange={handleChange}/>

<br/><br/>

<button onClick={addClient}>Save Client</button>

</div>

)

}