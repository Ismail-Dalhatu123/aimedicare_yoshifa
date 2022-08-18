import { Button } from '@mui/material';
import Pedometer from './Readings/Pedometer';
import HRV from './Readings/HRV';
import HeartRate from './Readings/HeartRate';
import BloodPressure from './Readings/BloodPressure';
import BloodOxygen from './Readings/BloodOxygen';

function Vitals() {
	return (
		<div className="vitals">
			<div className="btn-wrapper">
				<Button variant="contained">Today</Button>
				<Button variant="outlined">Yesterday</Button>
				<Button variant="outlined">2 days ago</Button>
			</div>

			<div className="readings">
				<Pedometer />
				<HRV />
				<HeartRate />
				<BloodPressure />
				<BloodOxygen />
			</div>
		</div>
	);
}

export default Vitals;
