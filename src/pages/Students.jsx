import { useState } from "react";
import Input from "../components/Input";
import Student from "../components/Student";
import "../css/students.css";
import students from "../data/students";

function Students(props) {
  const [render, setRender] = useState(students);
  const handleSearch = (f) =>
    setRender(
      students.filter((s) => s.name.toLowerCase().includes(f.toLowerCase()))
    );
  return (
    <div className="container containerv">
      <Input onChange={handleSearch} placeholder="Search by Player Name" />
      <div className="s_list">
        {render.map((s, idx) => (
          <Student {...s} idx={idx} key={idx} />
        ))}
      </div>
    </div>
  );
}

export default Students;
