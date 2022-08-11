import { Link } from "react-router-dom";

function Student({ name, idx, active }) {
  return (
    <Link to={`/students/${idx + 1}`} className="card student">
      <div className="img_s">
        <div className="div">
          <img
            src={`https://randomuser.me/api/portraits/men/${idx + 1}.jpg`}
            alt=""
          />
        </div>
      </div>
      <h3>{name}</h3>
      <span className="email">email@example.com</span>
      <div className={`status ${active ? "active" : "offline"}`}>
        <div></div>
        <span>{active ? "Online" : "Offline"}</span>
      </div>
    </Link>
  );
}

export default Student;
