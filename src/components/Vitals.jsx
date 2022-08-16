import pedometer from '../assets/svg/pedometer.svg';
import hrv from '../assets/svg/hrv.svg';
import Reading from './Reading';

function Vitals() {
	return (
		<div className="vitals">
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
		minValue: 0,
		maxValue: 10000,
	},
	{
		icon: hrv,
		name: 'HRV',
		value: 91,
		minValue: 0,
		maxValue: 180,
	},
	{
		icon: pedometer,
		name: 'Pedometer',
		value: 9000,
		minValue: 0,
		maxValue: 10000,
	},
	{
		icon: hrv,
		name: 'HRV',
		value: 91,
		minValue: 0,
		maxValue: 180,
	},
	{
		icon: pedometer,
		name: 'Pedometer',
		value: 9000,
		minValue: 0,
		maxValue: 10000,
	},
	{
		icon: hrv,
		name: 'HRV',
		value: 91,
		minValue: 0,
		maxValue: 180,
	},
];
