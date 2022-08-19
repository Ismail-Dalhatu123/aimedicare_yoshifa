import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import icon from '../../assets/svg/blood-oxygen.svg';
import axios from '../../axios';

function BloodOxygen() {
	const [data, setData] = useState([]);
	const id = useLocation().pathname.split('/').pop();
	const name = 'blood oxygen';

	useEffect(() => {
		axios
			.get(`/v1/vitals/${id}/blood-oxygen`)
			.then((res) => setData(res.data.data.readings));
	}, [id]);

	return (
		<div className="reading">
			<div className="title-wrapper">
				<img src={icon} alt={name} />
				<p>{name}</p>
			</div>

			<div className="value-wrapper">
				<p>
					<span>
						{data.length ? data[data.length - 1]?.['bloodOxygen'] : '0'}
					</span>
					%
				</p>
			</div>
		</div>
	);
}

export default BloodOxygen;
