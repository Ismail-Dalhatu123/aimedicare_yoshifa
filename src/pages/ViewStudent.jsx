import { Route, Routes } from 'react-router-dom';
import StudentInfo from '../components/StudentInfo';
import HeartRate from './HeartRate';
import BloodOxygen from './BloodOxygen';
import Pedometer from './Pedometer';
import SVitals from '../components/SVitals';
import C404 from './404';

function ViewStudent(props) {
	return (
		<div className="view-student">
			<StudentInfo {...props} />

			<div style={{ flex: 1 }}>
				<Routes>
					<Route path="/" element={<HeartRate />} />
					<Route path="/blood-oxygen" element={<BloodOxygen />} />
					<Route path="/pedometer" element={<Pedometer />} />
					<Route path="*" element={<C404 />} />
				</Routes>
			</div>

			<SVitals />
		</div>
	);
}

export default ViewStudent;
