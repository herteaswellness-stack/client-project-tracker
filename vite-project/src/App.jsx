import { useMemo, useState } from "react";

const statusOptions = [
  "Initial Feasibility Report",
  "2nd time visit",
  "Withdrawn",
  "Radon Test Scheduled",
  "LEAD test scheduled",
  "Radon&LEAD Scheduled",
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
  "Intrim Inspection#1",
  "Intrim Inspection#2",
  "Final scheduled",
  "Final Paper Submitted",
  "Case Closed",
  "Check Due",
];

const statusColors = {
  "Initial Feasibility Report": "#f2f2f2",
  "2nd time visit": "#f2f2f2",
  Withdrawn: "#d9d9d9",
  "Radon Test Scheduled": "#d9ead3",
  "LEAD test scheduled": "#d9ead3",
  "Radon&LEAD Scheduled": "#b6d7a8",
  "Specification Writeups": "#d9d2e9",
  "Submitted Bid Paperwork": "#d9d2e9",
  "Tier II review": "#d9d2e9",
  "Bidding Process": "#ffc000",
  "Re Bidding": "#ffd966",
  "Contract Making": "#ffff00",
  "Contract READY": "#ffff00",
  "Contract Signing Scheduled": "#fff2cc",
  "Contract Signing DONE": "#fff2cc",
  WIP: "#f4b183",
  "WIP-Overdue": "#e06666",
  "Intrim Inspection#1": "#b6d7a8",
  "Intrim Inspection#2": "#93c47d",
  "Final scheduled": "#d9d9d9",
  "Final Paper Submitted": "#d9d9d9",
  "Case Closed": "#a6a6a6",
  "Check Due": "#f4cccc",
};

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
  statusRemark: "Initial Feasibility Report",
};

function getStatusSortRank(status) {
  if (status === "WIP-Overdue") return 1;
  if (status === "WIP") return 2;
  if (status === "Contract READY") return 3;
  if (status === "Contract Signing Scheduled") return 4;
  if (status === "Contract Signing DONE") return 5;
  if (status === "Bidding Process") return 6;
  if (status === "Re Bidding") return 7;
  if (status === "Final scheduled") return 8;
  if (status === "Final Paper Submitted") return 9;
  if (status === "Case Closed") return 10;
  return 20;
}

function formatName(lastName, firstName) {
  return `${lastName || ""}${lastName && firstName ? ", " : ""}${firstName || ""}`.trim();
}

export default function App() {
  const [clients, setClients] = useState(() => {
    const saved = localStorage.getItem("clients");
    return saved ? JSON.parse(saved) : [];
  });

  const [form, setForm] = useState(defaultForm);
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showForm, setShowForm] = useState(true);

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  function addClient() {
    const newClient = {
      ...form,
      id: Date.now(),
    };

    const updated = [newClient, ...clients];
    setClients(updated);
    localStorage.setItem("clients", JSON.stringify(updated));
    setForm(defaultForm);
  }

  function deleteClient(id) {
    const updated = clients.filter((client) => client.id !== id);
    setClients(updated);
    localStorage.setItem("clients", JSON.stringify(updated));
  }

  const filteredClients = useMemo(() => {
    const keyword = searchText.trim().toLowerCase();

    return [...clients]
      .filter((client) => {
        const fullName = `${client.lastName} ${client.firstName}`.toLowerCase();
        const address = (client.address || "").toLowerCase();
        const phone = (client.phone || "").toLowerCase();
        const status = (client.statusRemark || "").toLowerCase();

        const matchSearch =
          keyword === "" ||
          fullName.includes(keyword) ||
          address.includes(keyword) ||
          phone.includes(keyword) ||
          status.includes(keyword);

        const matchStatus =
          statusFilter === "All" || client.statusRemark === statusFilter;

        return matchSearch && matchStatus;
      })
      .sort((a, b) => {
        const statusCompare =
          getStatusSortRank(a.statusRemark) - getStatusSortRank(b.statusRemark);

        if (statusCompare !== 0) return statusCompare;

        return (b.dateRcvd || "").localeCompare(a.dateRcvd || "");
      });
  }, [clients, searchText, statusFilter]);

  const dashboardCounts = useMemo(() => {
    const counts = {};
    statusOptions.forEach((status) => {
      counts[status] = clients.filter((client) => client.statusRemark === status).length;
    });
    return counts;
  }, [clients]);

  const pageStyle = {
    maxWidth: "1000px",
    margin: "0 auto",
    fontFamily: "Arial, sans-serif",
    padding: "16px",
    color: "#222",
  };

  const sectionStyle = {
    border: "1px solid #ddd",
    borderRadius: "12px",
    padding: "16px",
    marginBottom: "16px",
    background: "#fff",
    boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
  };

  const inputStyle = {
    width: "100%",
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    boxSizing: "border-box",
    fontSize: "16px",
  };

  const labelStyle = {
    fontWeight: "600",
    marginBottom: "4px",
  };

  const buttonStyle = {
    padding: "10px 14px",
    borderRadius: "8px",
    border: "none",
    background: "#2d6cdf",
    color: "#fff",
    fontSize: "15px",
    cursor: "pointer",
  };

  const secondaryButtonStyle = {
    ...buttonStyle,
    background: "#6c757d",
  };

  return (
    <div style={pageStyle}>
      <h1 style={{ textAlign: "center", marginBottom: "12px" }}>Client Project Tracker</h1>

      <div style={{ ...sectionStyle, background: "#f8fbff" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "10px",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <h2 style={{ margin: 0 }}>Quick Actions</h2>
          <button
            style={secondaryButtonStyle}
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? "Hide Form" : "Show Form"}
          </button>
        </div>
      </div>

      {showForm && (
        <div style={sectionStyle}>
          <h2>Add Client</h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "12px",
            }}
          >
            <div>
              <div style={labelStyle}>Date RCVD</div>
              <input style={inputStyle} type="date" name="dateRcvd" value={form.dateRcvd} onChange={handleChange} />
            </div>

            <div>
              <div style={labelStyle}>Last Name</div>
              <input style={inputStyle} type="text" name="lastName" value={form.lastName} onChange={handleChange} />
            </div>

            <div>
              <div style={labelStyle}>First Name</div>
              <input style={inputStyle} type="text" name="firstName" value={form.firstName} onChange={handleChange} />
            </div>

            <div>
              <div style={labelStyle}>Address</div>
              <input style={inputStyle} type="text" name="address" value={form.address} onChange={handleChange} />
            </div>

            <div>
              <div style={labelStyle}>Phone</div>
              <input style={inputStyle} type="text" name="phone" value={form.phone} onChange={handleChange} />
            </div>

            <div>
              <div style={labelStyle}>1st Visit</div>
              <input style={inputStyle} type="date" name="firstVisit" value={form.firstVisit} onChange={handleChange} />
            </div>

            <div>
              <div style={labelStyle}>Feasibility Report</div>
              <input
                style={inputStyle}
                type="date"
                name="feasibilityReport"
                value={form.feasibilityReport}
                onChange={handleChange}
              />
            </div>

            <div>
              <div style={labelStyle}>Contract Date</div>
              <input style={inputStyle} type="date" name="contractDate" value={form.contractDate} onChange={handleChange} />
            </div>

            <div>
              <div style={labelStyle}>Contractor</div>
              <input style={inputStyle} type="text" name="contractor" value={form.contractor} onChange={handleChange} />
            </div>

            <div>
              <div style={labelStyle}>Est. Start</div>
              <input style={inputStyle} type="date" name="estStart" value={form.estStart} onChange={handleChange} />
            </div>

            <div>
              <div style={labelStyle}>1st Interim</div>
              <input style={inputStyle} type="date" name="firstInterim" value={form.firstInterim} onChange={handleChange} />
            </div>

            <div>
              <div style={labelStyle}>2nd Interim</div>
              <input style={inputStyle} type="date" name="secondInterim" value={form.secondInterim} onChange={handleChange} />
            </div>

            <div>
              <div style={labelStyle}>3rd Interim</div>
              <input style={inputStyle} type="date" name="thirdInterim" value={form.thirdInterim} onChange={handleChange} />
            </div>

            <div>
              <div style={labelStyle}>Final</div>
              <input style={inputStyle} type="date" name="finalDate" value={form.finalDate} onChange={handleChange} />
            </div>

            <div style={{ gridColumn: "1 / -1" }}>
              <div style={labelStyle}>Status Remark</div>
              <select style={inputStyle} name="statusRemark" value={form.statusRemark} onChange={handleChange}>
                {statusOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div style={{ marginTop: "16px" }}>
            <button style={buttonStyle} onClick={addClient}>
              Add Client
            </button>
          </div>
        </div>
      )}

      <div style={sectionStyle}>
        <h2>Status Dashboard</h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "10px",
          }}
        >
          {statusOptions.map((status) => (
            <div
              key={status}
              style={{
                backgroundColor: statusColors[status] || "#ffffff",
                border: "1px solid #ccc",
                padding: "10px",
                borderRadius: "8px",
                fontSize: "14px",
              }}
            >
              <strong>{status}</strong>: {dashboardCounts[status]}
            </div>
          ))}
        </div>
      </div>

      <div style={sectionStyle}>
        <h2>Search / Filter</h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "12px",
          }}
        >
          <input
            style={inputStyle}
            type="text"
            placeholder="Search by name, address, phone, or status"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />

          <select style={inputStyle} value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="All">All Status</option>
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
      </div>

      <h2>Client List</h2>

      {filteredClients.length === 0 ? (
        <div style={sectionStyle}>No matching client found.</div>
      ) : (
        filteredClients.map((c) => (
          <div
            key={c.id}
            style={{
              border: "1px solid #999",
              padding: "14px",
              marginBottom: "12px",
              backgroundColor: statusColors[c.statusRemark] || "#ffffff",
              borderRadius: "10px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "12px",
                flexWrap: "wrap",
                marginBottom: "8px",
              }}
            >
              <b style={{ fontSize: "18px" }}>{formatName(c.lastName, c.firstName)}</b>
              <button
                onClick={() => deleteClient(c.id)}
                style={{
                  padding: "8px 12px",
                  borderRadius: "8px",
                  border: "none",
                  background: "#c62828",
                  color: "#fff",
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
            </div>

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
        ))
      )}
    </div>
  );
}