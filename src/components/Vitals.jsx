import { Button } from '@mui/material';
import Reading from './Reading';
import pedometer from '../assets/svg/pedometer.svg';
import hrv from '../assets/svg/hrv.svg';
import heartRate from '../assets/svg/heart-rate.svg';
import bloodPressure from '../assets/svg/blood-pressure.svg';
import bloodOxygen from '../assets/svg/blood-oxygen.svg';

function Vitals() {
	return (
		<div className="vitals">
			<div className="btn-wrapper">
				<Button variant="contained">Today</Button>
				<Button variant="outlined">Yesterday</Button>
				<Button variant="outlined">2 days ago</Button>
			</div>

			<div className="readings">
				{readings.map((reading) => (
					<Reading key={reading.name} {...reading} />
				))}
			</div>
		</div>
	);
}

export default Vitals;

const readings = [
	{
		icon: pedometer,
		name: 'Pedometer',
		value: 9000,
		maxValue: 10000,
		unit: 'steps',
	},
	{
		icon: hrv,
		name: 'HRV',
		value: 91,
		maxValue: 180,
		unit: 'HRV',
	},
	{
		icon: heartRate,
		name: 'Heart Rate',
		value: 9000,
		maxValue: 10000,
		unit: 'BPM',
	},
	{
		icon: bloodPressure,
		name: 'Blood Pressure',
		value: 91,
		maxValue: 180,
		unit: 'mmHg',
	},
	{
		icon: bloodOxygen,
		name: 'Blood Oxygen',
		value: 9000,
		maxValue: 10000,
		unit: '%',
	},
];
