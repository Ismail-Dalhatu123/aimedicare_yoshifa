import { useEffect, useState } from 'react';
import { useId } from '../hooks/useId';
import {
	LineChart,
	Line,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
} from 'recharts';
import axios from '../axios';

function BloodPressure({ date }) {
	const [readings, setReadings] = useState([]);
	const id = useId();

	useEffect(() => {
		axios
			.get(`/v1/vitals/${id}/blood-pressure?from${date}&to${date}`)
			.then((res) => {
				const arr = res.data.data.readings.map(
					(reading) => reading.bloodPressure
				);
				setReadings(arr);
			});
	}, [id, date]);

	return (
		<div className="pedometer">
			<div className="chart">
				<ResponsiveContainer width="100%" height="100%">
					<LineChart
						width={300}
						height={100}
						data={readings}
						margin={{ top: 10, left: -20, right: 20 }}
					>
						<CartesianGrid strokeDasharray="3 3" />
						<YAxis stroke="#067f81" />
						<Tooltip />
						<Line
							type="monotone"
							dataKey="high"
							stroke="#067f81"
							strokeWidth={2}
						/>
						<Line
							type="monotone"
							dataKey="low"
							stroke="#067f81"
							strokeWidth={2}
						/>
					</LineChart>
				</ResponsiveContainer>
			</div>
		</div>
	);
}

export default BloodPressure;
