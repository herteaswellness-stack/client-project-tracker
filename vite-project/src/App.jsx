import { useState } from "react";

const statusOptions = [
  "Initial Fesiability Report",
  "2nd time visit",
  "Withdrawn",
  "Radon Test Scheduled",
  "LEAD test scheduled",
  "Radon&LEAD Scheduled",
  "Specification Wrieups",
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
  "Intrim Inspection#1",
  "Intrim Inspection#2",
  "Final scheduled",
  "Final Paper Submitted",
  "Case Closed",
  "Check Due"
];

const statusColors = {
  "Initial Fesiability Report": "#e0e0e0",
  "2nd time visit": "#e0e0e0",
  "Withdrawn": "#999999",
  "Radon Test Scheduled": "#d0e8ff",
  "LEAD test scheduled": "#d0e8ff",
  "Radon&LEAD Scheduled": "#d0e8ff",
  "Specification Wrieups": "#fff4b3",
  "Submitted Bid Paperwork": "#fff4b3",
  "Tier II review": "#fff4b3",
  "Bidding Process": "#ffd966",
  "Re Bidding": "#ffd966",
  "Contract Making": "#fff200",
  "Contract READY": "#fff200",
  "Contract Signing Scheduled": "#fff200",
  "Contract Signing DONE": "#fff200",
  "WIP": "#f4b183",
  "WIP-Overdue": "#ff4d4d",
  "Intrim Inspection#1": "#b6d7a8",
  "Intrim Inspection#2": "#b6d7a8",
  "Final scheduled": "#cfe2f3",
  "Final Paper Submitted": "#cfe2f3",
  "Case Closed": "#999999",
  "Check Due": "#f9cb9c"
};

export default function App() {

  const [clients, setClients] = useState(() => {
    const saved = localStorage.getItem("clients");
    return saved ? JSON.parse(saved) : [];
  });

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    caseDate: "",
    visitDate: "",
    reportDate: "",
    contractDate: "",
    interimInspection: "",
    finalInspection: "",
    status: statusOptions[0]
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
      name: "",
      phone: "",
      address: "",
      caseDate: "",
      visitDate: "",
      reportDate: "",
      contractDate: "",
      interimInspection: "",
      finalInspection: "",
      status: statusOptions[0]
    });
  }

  return (
    <div style={{ maxWidth: 800, margin: "auto", fontFamily: "Arial" }}>

      <h1>Client Project Tracker</h1>

      <h3>Add Client</h3>

      <input name="name" placeholder="Client Name" value={form.name} onChange={handleChange} /><br />
      <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} /><br />
      <input name="address" placeholder="Address" value={form.address} onChange={handleChange} /><br /><br />

      Case Received Date<br />
      <input type="date" name="caseDate" value={form.caseDate} onChange={handleChange} /><br />

      Visit Date<br />
      <input type="date" name="visitDate" value={form.visitDate} onChange={handleChange} /><br />

      Report Date<br />
      <input type="date" name="reportDate" value={form.reportDate} onChange={handleChange} /><br />

      Contract Signing<br />
      <input type="date" name="contractDate" value={form.contractDate} onChange={handleChange} /><br />

      Interim Inspection<br />
      <input type="date" name="interimInspection" value={form.interimInspection} onChange={handleChange} /><br />

      Final Inspection<br />
      <input type="date" name="finalInspection" value={form.finalInspection} onChange={handleChange} /><br /><br />

      Status<br />
      <select name="status" value={form.status} onChange={handleChange}>
        {statusOptions.map(option => (
          <option key={option}>{option}</option>
        ))}
      </select>

      <br /><br />

      <button onClick={addClient}>Add Client</button>

      <hr />

      <h2>Client List</h2>

      {clients.map((c, i) => (

        <div
          key={i}
          style={{
            border: "1px solid #ccc",
            padding: 12,
            marginBottom: 10,
            backgroundColor: statusColors[c.status] || "#ffffff"
          }}
        >

          <b>{c.name}</b>

          <div>Phone: {c.phone}</div>
          <div>Address: {c.address}</div>
          <div>Case Date: {c.caseDate}</div>
          <div>Visit Date: {c.visitDate}</div>
          <div>Report Date: {c.reportDate}</div>
          <div>Contract Date: {c.contractDate}</div>
          <div>Interim Inspection: {c.interimInspection}</div>
          <div>Final Inspection: {c.finalInspection}</div>
          <div>Status: {c.status}</div>

        </div>

      ))}

    </div>
  );
}