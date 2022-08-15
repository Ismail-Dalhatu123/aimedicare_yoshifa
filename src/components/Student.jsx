import { Link } from 'react-router-dom';

function Student({ id, photo, firstName, lastName, email, active }) {
	const fullName = `${firstName} ${lastName}`;

	return (
		<Link to={`/students/${id}`} className="student">
			<div className="img-wrapper">
				<img src={photo} alt={fullName} />
			</div>

			<h3>{fullName}</h3>
			<div className="email">{email}</div>

			<div className={`status ${active ? 'active' : 'offline'}`}>
				<div></div>
				<span>{active ? 'Online' : 'Offline'}</span>
			</div>
		</Link>
	);
}

export default Student;
