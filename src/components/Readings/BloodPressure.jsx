import { useState } from 'react';
import { useEffectOnce } from '../../hooks/useEffectOnce';
import { useLocation } from 'react-router';
import icon from '../../assets/svg/heart-rate.svg';
import axios from '../../axios';

function BloodPressure() {
	const [data, setData] = useState([]);
	const id = useLocation().pathname.split('/').pop();
	const name = 'blood pressure';

	useEffectOnce(() => {
		axios
			.get(`/v1/vitals/${id}/blood-pressure`)
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
						{data.length
							? `${data[data.length - 1]?.['bloodPressure'].low}/${
									data[data.length - 1]?.['bloodPressure'].high
							  }`
							: '0/0'}
					</span>{' '}
					mmHg
				</p>
			</div>
		</div>
	);
}

export default BloodPressure;
