import { useState } from "react";

function Students() {
  const [students, setStudents] = useState(["Alison", "John"]);
  const [name, setName] = useState("");

  const addStudent = () => {
    if (name.trim() === "") return;

    setStudents([...students, name]);
    setName("");
  };

  return (
    <div>
      <h2>Student List</h2>

      <input
        placeholder="Enter student name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <button onClick={addStudent}>Add</button>

      <ul>
        {students.map((s, index) => (
          <li key={index}>{s}</li>
        ))}
      </ul>
    </div>
  );
}

export default Students;