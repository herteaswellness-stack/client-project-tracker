import { useState } from "react";

const API_URL =
  "https://script.google.com/macros/s/AKfycbyRPFuizqwTueQzKCsjxjk01YNh-3E3TibKQr3KqQ6fLJYF7yNcUliMjwGofuS7NSU8ew/exec";

export default function App() {
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
    statusRemark: ""
  });

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  return (
    <div style={{ maxWidth: 700, margin: "40px auto", padding: 20 }}>
      <h1>Client Project Tracker</h1>
      <h2>Add Client</h2>

      <form method="POST" action={API_URL} target="_blank">
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
          value={form.lastName}
          onChange={handleChange}
        />

        <label>First Name</label>
        <input
          name="firstName"
          value={form.firstName}
          onChange={handleChange}
        />

        <label>Address</label>
        <input
          name="address"
          value={form.address}
          onChange={handleChange}
        />

        <label>Phone</label>
        <input
          name="phone"
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
          value={form.contractor}
          onChange={handleChange}
        />

        <label>Est Start</label>
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
        <input
          name="statusRemark"
          value={form.statusRemark}
          onChange={handleChange}
        />

        <br />
        <br />

        <button type="submit">Save Client</button>
      </form>
    </div>
  );
}