import React, { useState } from "react";

function App() {
  const [form, setForm] = useState({
    name: "",
    roll: "",
    year: "",
    course: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Registration Successful!");
  };

  return (
    <div style={{
      width: "350px",
      margin: "50px auto",
      padding: "25px",
      background: "#f3e8ff",
      borderRadius: "15px",
      boxShadow: "0 0 15px gray"
    }}>
      <h2 style={{ textAlign: "center" }}>Student Registration</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        /><br /><br />

        <input
          name="roll"
          placeholder="Roll Number"
          value={form.roll}
          onChange={handleChange}
          required
        /><br /><br />

        <select
          name="year"
          value={form.year}
          onChange={handleChange}
          required
        >
          <option value="">Select Year</option>
          <option>1st Year</option>
          <option>2nd Year</option>
          <option>3rd Year</option>
          <option>4th Year</option>
        </select><br /><br />

        <select
          name="course"
          value={form.course}
          onChange={handleChange}
          required
        >
          <option value="">Select Course</option>
          <option>B.Tech</option>
          <option>M.Tech</option>
        </select><br /><br />

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default App;