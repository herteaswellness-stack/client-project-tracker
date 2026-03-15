import { useEffect, useState } from "react";

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
  "Check Due",
];

const defaultForm = {
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
  statusRemark: "Initial Fesiability Report",
};

export default function App() {
  const [clients, setClients] = useState(() => {
    const saved = localStorage.getItem("clients");
    return saved ? JSON.parse(saved) : [];
  });

  const [form, setForm] = useState(defaultForm);

  useEffect(() => {
    localStorage.setItem("clients", JSON.stringify(clients));
  }, [clients]);

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  function addClient() {
    const updated = [...clients, form];
    setClients(updated);
    setForm(defaultForm);
  }

  return (
    <div style={{ padding: 20, fontFamily: "Arial" }}>
      <h1>Client Project Tracker</h1>

      <h2>Add Client</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "220px 220px",
          gap: 10,
          alignItems: "center",
          maxWidth: 700,
        }}
      >
        <label>Date RCVD</label>
        <input
          type="date"
          name="dateRcvd"
          value={form.dateRcvd}
          onChange={handleChange}
        />

        <label>Last Name</label>
        <input
          name="lastName"
          placeholder="Last Name"
          value={form.lastName}
          onChange={handleChange}
        />

        <label>First Name</label>
        <input
          name="firstName"
          placeholder="First Name"
          value={form.firstName}
          onChange={handleChange}
        />

        <label>Address</label>
        <input
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
        />

        <label>Phone</label>
        <input
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
        />

        <label>1st Visit</label>
        <input
          type="date"
          name="firstVisit"
          value={form.firstVisit}
          onChange={handleChange}
        />

        <label>Feasibility Report</label>
        <input
          type="date"
          name="feasibilityReport"
          value={form.feasibilityReport}
          onChange={handleChange}
        />

        <label>Contract Date</label>
        <input
          type="date"
          name="contractDate"
          value={form.contractDate}
          onChange={handleChange}
        />

        <label>Contractor</label>
        <input
          name="contractor"
          placeholder="Contractor"
          value={form.contractor}
          onChange={handleChange}
        />

        <label>Est. Start</label>
        <input
          type="date"
          name="estStart"
          value={form.estStart}
          onChange={handleChange}
        />

        <label>1st Interim</label>
        <input
          type="date"
          name="firstInterim"
          value={form.firstInterim}
          onChange={handleChange}
        />

        <label>2nd Interim</label>
        <input
          type="date"
          name="secondInterim"
          value={form.secondInterim}
          onChange={handleChange}
        />

        <label>3rd Interim</label>
        <input
          type="date"
          name="thirdInterim"
          value={form.thirdInterim}
          onChange={handleChange}
        />

        <label>Final</label>
        <input
          type="date"
          name="finalDate"
          value={form.finalDate}
          onChange={handleChange}
        />

        <label>Status Remark</label>
        <select
          name="statusRemark"
          value={form.statusRemark}
          onChange={handleChange}
        >
          {statusOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <br />
      <button onClick={addClient}>Add Client</button>

      <hr />

      <h2>Client List</h2>

      {clients.map((c, i) => (
        <div
          key={i}
          style={{ border: "1px solid #ccc", padding: 12, marginBottom: 10 }}
        >
          <b>
            {c.lastName}, {c.firstName}
          </b>
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