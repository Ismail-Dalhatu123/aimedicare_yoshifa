import { useLocation, useNavigate } from 'react-router';
import back from '../assets/svg/back-arrow.svg';
import player from '../assets/png/player.png';

function StudentInfo() {
	const { firstName, lastName, age, email, phone, active } =
		useLocation().state;
	const fullName = `${firstName} ${lastName}`;

	const navigate = useNavigate();

	return (
		<div className="student-info">
			<div className="details">
				<div className="img-wrapper" onClick={() => navigate(-1)}>
					<img src={back} alt="go back" />
				</div>

				<div className="status">
					<div className={active ? 'online' : 'offline'} />
				</div>

				<div className="name-wrapper">
					<p className="name">{fullName}</p>
					<p className="email">{email}</p>
				</div>

				<div className="age-wrapper">
					<p>Age: {age}</p>
					<p>Gender: Male</p>
					<p>Phone: {phone}</p>
				</div>
			</div>

			<div className="player-wrapper">
				<img src={player} alt={fullName} />
			</div>

			<div className="map-wrapper">
				<p>GPS</p>
			</div>
		</div>
	);
}

export default StudentInfo;
