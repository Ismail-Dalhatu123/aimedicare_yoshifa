import { Link } from 'react-router-dom';

function StudentCard({ id, image, fullname }) {
	return (
		<Link to={`/students/${id}`} className="student-card">
			<div className="img-wrapper">
				<img
					src={`https://api-aimedicare-yoshifa.herokuapp.com/api/v1/file-streams/${image}`}
					alt={fullname}
				/>
			</div>

			<h3>{fullname}</h3>
			<div className="email">email@example.com</div>

			{/* <div className={`status ${active ? 'active' : 'offline'}`}>
				<span />
				<p>{active ? 'Online' : 'Offline'}</p>
			</div> */}
		</Link>
	);
}

export default StudentCard;
