import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import icon from '../../assets/svg/heart-rate.svg';
import axios from '../../axios';

function HeartRate() {
	const [data, setData] = useState([]);
	const id = useLocation().pathname.split('/').pop();
	const name = 'heart rate';

	useEffect(() => {
		axios
			.get(`/v1/vitals/${id}/heart-rate`)
			.then((res) => setData(res.data.data.readings));
	}, [id]);

	return (
		<div className="reading">
			<div className="title-wrapper">
				<img src={icon} alt={name} />
				<p>{name}</p>
			</div>

			<div className="value-wrapper-big">
				<p>
					<span>
						{data.length ? data[data.length - 1]?.['heartRate'] : '0'}
					</span>{' '}
					BPM
				</p>
			</div>
		</div>
	);
}

export default HeartRate;
