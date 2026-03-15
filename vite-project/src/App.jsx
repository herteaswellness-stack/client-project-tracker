import { useState } from "react";

const statusOptions = [
  "Initial Feasibility Report",
  "2nd time visit",
  "Withdrawn",
  "Radon Test Scheduled",
  "LEAD test scheduled",
  "Radon & LEAD Scheduled",
  "Specification Writeups",
  "Submitted Bid Paperwork",
  "Tier II review",
  "Bidding Process",
  "Re Bidding",
  "Contract Making",
  "Contract READY",
  "Contract Signing Scheduled",
  "Contract Signing DONE",
  "WIP",
  "WIP-Overdue",
  "1st Interim",
  "2nd Interim",
  "3rd Interim",
  "Final scheduled",
  "Final Paper Submitted",
  "Case Closed",
  "Check Due"
];

export default function App() {

  const [clients, setClients] = useState(() => {
    const saved = localStorage.getItem("clients");
    return saved ? JSON.parse(saved) : [];
  });

  const [form, setForm] = useState({
    dateRcvd: "",
    lastName: "",
    firstName: "",
    address: "",
    phone: "",
    firstVisit: "",
    feasibilityReport: "",
    contractDate: "",
    contractor: "",
    estStart: "",
    firstInterim: "",
    secondInterim: "",
    thirdInterim: "",
    finalDate: "",
    statusRemark: statusOptions[0]
  });

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  function addClient() {

    const updated = [...clients, form];

    setClients(updated);

    localStorage.setItem("clients", JSON.stringify(updated));

    setForm({
      dateRcvd: "",
      lastName: "",
      firstName: "",
      address: "",
      phone: "",
      firstVisit: "",
      feasibilityReport: "",
      contractDate: "",
      contractor: "",
      estStart: "",
      firstInterim: "",
      secondInterim: "",
      thirdInterim: "",
      finalDate: "",
      statusRemark: statusOptions[0]
    });

  }

  return (

    <div style={{ maxWidth: 900, margin: "auto", fontFamily: "Arial" }}>

      <h1>Client Project Tracker</h1>

      <h3>Add Client</h3>

      Date RCVD<br/>
      <input type="date" name="dateRcvd" value={form.dateRcvd} onChange={handleChange}/><br/>

      Last Name<br/>
      <input name="lastName" value={form.lastName} onChange={handleChange}/><br/>

      First Name<br/>
      <input name="firstName" value={form.firstName} onChange={handleChange}/><br/>

      Address<br/>
      <input name="address" value={form.address} onChange={handleChange}/><br/>

      Phone<br/>
      <input name="phone" value={form.phone} onChange={handleChange}/><br/>

      1st Visit<br/>
      <input type="date" name="firstVisit" value={form.firstVisit} onChange={handleChange}/><br/>

      Feasibility Report<br/>
      <input type="date" name="feasibilityReport" value={form.feasibilityReport} onChange={handleChange}/><br/>

      Contract Date<br/>
      <input type="date" name="contractDate" value={form.contractDate} onChange={handleChange}/><br/>

      Contractor<br/>
      <input name="contractor" value={form.contractor} onChange={handleChange}/><br/>

      Est. Start<br/>
      <input type="date" name="estStart" value={form.estStart} onChange={handleChange}/><br/>

      1st Interim<br/>
      <input type="date" name="firstInterim" value={form.firstInterim} onChange={handleChange}/><br/>

      2nd Interim<br/>
      <input type="date" name="secondInterim" value={form.secondInterim} onChange={handleChange}/><br/>

      3rd Interim<br/>
      <input type="date" name="thirdInterim" value={form.thirdInterim} onChange={handleChange}/><br/>

      Final<br/>
      <input type="date" name="finalDate" value={form.finalDate} onChange={handleChange}/><br/><br/>

      Status Remark<br/>
      <select name="statusRemark" value={form.statusRemark} onChange={handleChange}>
        {statusOptions.map(option => (
          <option key={option}>{option}</option>
        ))}
      </select>

      <br/><br/>

      <button onClick={addClient}>Add Client</button>

      <hr/>

      <h2>Client List</h2>

      {clients.map((c,i)=>(
        <div key={i} style={{border:"1px solid #ccc", padding:12, marginBottom:10}}>

          <b>{c.lastName}, {c.firstName}</b>

          <div><strong>Date RCVD:</strong> {c.dateRcvd}</div>
          <div><strong>Address:</strong> {c.address}</div>
          <div><strong>Phone:</strong> {c.phone}</div>
          <div><strong>1st Visit:</strong> {c.firstVisit}</div>
          <div><strong>Feasibility Report:</strong> {c.feasibilityReport}</div>
          <div><strong>Contract Date:</strong> {c.contractDate}</div>
          <div><strong>Contractor:</strong> {c.contractor}</div>
          <div><strong>Est. Start:</strong> {c.estStart}</div>
          <div><strong>1st Interim:</strong> {c.firstInterim}</div>
          <div><strong>2nd Interim:</strong> {c.secondInterim}</div>
          <div><strong>3rd Interim:</strong> {c.thirdInterim}</div>
          <div><strong>Final:</strong> {c.finalDate}</div>
          <div><strong>Status Remark:</strong> {c.statusRemark}</div>

        </div>
      ))}

    </div>
  );
}