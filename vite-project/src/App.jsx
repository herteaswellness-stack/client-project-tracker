import { useState } from "react";

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
    status: "New"
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
      status: "New"
    });
  }

  return (
    <div style={{ padding: 20, fontFamily: "Arial" }}>
      <h1>Client Project Tracker</h1>

      <h2>Add Client</h2>

      <input name="name" placeholder="Client Name" value={form.name} onChange={handleChange} />
      <br />

      <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} />
      <br />

      <input name="address" placeholder="Address" value={form.address} onChange={handleChange} />
      <br />

      <label>Case Received Date</label>
      <input type="date" name="caseDate" value={form.caseDate} onChange={handleChange} />
      <br />

      <label>Visit Date</label>
      <input type="date" name="visitDate" value={form.visitDate} onChange={handleChange} />
      <br />

      <label>Report Date</label>
      <input type="date" name="reportDate" value={form.reportDate} onChange={handleChange} />
      <br />

      <label>Contract Signing</label>
      <input type="date" name="contractDate" value={form.contractDate} onChange={handleChange} />
      <br />

      <label>Interim Inspection</label>
      <input type="date" name="interimInspection" value={form.interimInspection} onChange={handleChange} />
      <br />

      <label>Final Inspection</label>
      <input type="date" name="finalInspection" value={form.finalInspection} onChange={handleChange} />
      <br />

      <label>Status</label>
      <select name="status" value={form.status} onChange={handleChange}>
        <option>New</option>
        <option>Visited</option>
        <option>Report Done</option>
        <option>Contract Signed</option>
        <option>Under Construction</option>
        <option>Final Inspection</option>
        <option>Completed</option>
      </select>

      <br />
      <br />

      <button onClick={addClient}>Add Client</button>

      <hr />

      <h2>Client List</h2>

      {clients.map((c, i) => (
        <div key={i} style={{ border: "1px solid #ccc", padding: 10, marginBottom: 10 }}>
          <b>{c.name}</b>
          <div>{c.phone}</div>
          <div>{c.address}</div>
          <div>Status: {c.status}</div>
        </div>
      ))}
    </div>
  );
}
