import { useState } from 'react';
import { useEffectOnce } from '../../hooks/useEffectOnce';
import { useLocation } from 'react-router';
import CircularProgress from '@mui/material/CircularProgress';
import icon from '../../assets/svg/pedometer.svg';
import axios from '../../axios';

function Pedometer() {
	const [data, setData] = useState([]);
	const id = useLocation().pathname.split('/').pop();
	const name = 'pedometer';
	const steps = data.length ? data[data.length - 1]?.step : 0;
	const progress = Math.round((steps / 10000) * 100);

	// useEffectOnce(() => {
	// 	axios
	// 		.get(`/v1/vitals/${id}/sport-data`)
	// 		.then((res) => setData(res.data.data.readings))
	// 		.catch((err) => console.log(err.message));
	// }, [id]);

	return (
		<div className="reading">
			<div className="title-wrapper">
				<img src={icon} alt={name} />
				<p>{name}</p>
			</div>

			<div className="circular-progress">
				<CircularProgress
					variant="determinate"
					value={progress}
					size={70}
					thickness={5}
				/>
			</div>

			<div className="progress-wrapper">
				<p>{progress}%</p>
			</div>

			<div className="value-wrapper">
				<p>
					<span>{steps}</span> steps
				</p>
			</div>
		</div>
	);
}

export default Pedometer;
