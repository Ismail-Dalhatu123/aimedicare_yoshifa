import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import icon from '../../assets/svg/hrv.svg';
import axios from '../../axios';

function HRV() {
	const [data, setData] = useState([]);
	const id = useLocation().pathname.split('/').pop();
	const name = 'hrv';

	// useEffect(() => {
	// 	axios
	// 		.get(`/v1/vitals/${id}/hrv`)
	// 		.then((res) => setData(res.data.data.readings))
	// 		.catch((err) => setData(err));
	// }, [id]);

	return (
		<div className="reading">
			<div className="title-wrapper">
				<img src={icon} alt={name} />
				<p>{name}</p>
			</div>

			<div className="value-wrapper">
				<p>
					{/* <span>{data.length ? data[data.length - 1]?.['hrv'] : '0'}</span>% */}
					<span>0</span>%
				</p>
			</div>
		</div>
	);
}

export default HRV;
