import { Link } from 'react-router-dom';

function StudentCard(props) {
	const { id, photo, firstName, lastName, email, active } = props;
	const fullName = `${firstName} ${lastName}`;

	return (
		<Link to={`/students/${id}`} state={props} className="student-card">
			<div className="img-wrapper">
				<img src={photo} alt={fullName} />
			</div>

			<h3>{fullName}</h3>
			<div className="email">{email}</div>

			<div className={`status ${active ? 'active' : 'offline'}`}>
				<span />
				<p>{active ? 'Online' : 'Offline'}</p>
			</div>
		</Link>
	);
}

export default StudentCard;
