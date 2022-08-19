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
import { Tab, Tabs } from '@mui/material';
import TabPanel from './TabPanel';
import { getTime } from '../functions';
import step from '../assets/svg/step.svg';
import distance from '../assets/svg/walking.svg';
import kcal from '../assets/svg/fire.svg';
import axios from '../axios';

function Pedometer({ date }) {
	const [readings, setReadings] = useState([]);
	const [value, setValue] = useState(0);
	const id = useId();

	useEffect(() => {
		axios
			.get(`/v1/vitals/${id}/sport-data?from${date}&to${date}`)
			.then((res) => setReadings(res.data.data.readings));
	}, [id, date]);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

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
						<YAxis dataKey="step" stroke="#067f81" />
						<Tooltip />
						<Line
							type="monotone"
							dataKey="step"
							stroke="#067f81"
							strokeWidth={2}
						/>
					</LineChart>
				</ResponsiveContainer>
			</div>

			<div className="tabs-wrapper">
				<div className="tabs">
					<Tabs value={value} onChange={handleChange}>
						<Tab label="Steps" />
						<Tab label="Distance" />
						<Tab label="Calories" />
					</Tabs>
				</div>

				<TabPanel value={value} index={0}>
					{readings.map((reading, index) => (
						<Step
							key={index}
							img={step}
							item={getTime(new Date(reading.createdAt))}
							value={reading.step}
						/>
					))}
				</TabPanel>

				<TabPanel value={value} index={1}>
					{readings.map((reading, index) => (
						<Step
							key={index}
							img={distance}
							item={getTime(new Date(reading.createdAt))}
							value={reading.distance}
						/>
					))}
				</TabPanel>

				<TabPanel value={value} index={2}>
					{readings.map((reading, index) => (
						<Step
							key={index}
							img={kcal}
							item={getTime(new Date(reading.createdAt))}
							value={reading.Kcal}
						/>
					))}
				</TabPanel>
			</div>
		</div>
	);
}

export default Pedometer;

function Step({ img, item, value }) {
	return (
		<div className="step">
			<p>{item}</p>
			<img src={img} alt="" />
			<p>{value}</p>
		</div>
	);
}
