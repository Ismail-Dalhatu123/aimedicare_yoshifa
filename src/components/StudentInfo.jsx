import { useNavigate } from 'react-router';
import back from '../assets/svg/back-arrow.svg';
import player from '../assets/png/player.png';

function StudentInfo({ fullname, gender, phoneNumber }) {
	const navigate = useNavigate();

	return (
		<div className="student-info">
			<div className="details">
				<div className="img-wrapper" onClick={() => navigate(-1)}>
					<img src={back} alt="go back" />
				</div>

				{/* <div className="status">
					<div className={active ? 'online' : 'offline'} />
				</div> */}

				<div className="name-wrapper">
					<p className="name">{fullname}</p>
					{/* <p className="email">{email}</p> */}
				</div>

				<div className="age-wrapper">
					{/* <p>Age: {age}</p> */}
					<p>Gender: {gender}</p>
					<p>Phone: {phoneNumber}</p>
				</div>
			</div>

			<div className="player-wrapper">
				<img src={player} alt={fullname} />
			</div>

			<div className="map-wrapper">
				<p>GPS</p>
			</div>
		</div>
	);
}

export default StudentInfo;
