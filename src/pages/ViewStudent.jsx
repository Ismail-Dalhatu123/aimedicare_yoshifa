import { cloneElement, useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { IconButton, TextField } from '@mui/material';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import StudentInfo from '../components/StudentInfo';
import Vitals from '../components/Vitals';
import Pedometer from '../components/Pedometer';
import prevArrow from '../assets/svg/prev-arrow.svg';
import nextArrow from '../assets/svg/next-arrow.svg';
import axios from '../axios';
import { getDate } from '../functions';
import HeartRate from '../components/HeartRate';

function ViewStudent() {
	const [player, setPlayer] = useState({
		fullname: '',
		gender: '',
		phoneNumber: '',
	});
	const [index, setIndex] = useState(0);
	const [value, setValue] = useState(new Date());
	const [date, setDate] = useState(getDate(value._d));

	const location = useLocation().pathname.split('/');
	const id = location.pop();

	useEffect(() => {
		axios
			.get(`/v1/players/${id}`)
			.then((res) => setPlayer(res.data.data.player));
	}, [id]);

	const handlePrev = () =>
		setIndex((prev) => {
			const number = prev - 1;
			if (number < 0) return 2;
			return number;
		});

	const handleNext = () =>
		setIndex((prev) => {
			const number = prev + 1;
			if (number > 2) return 0;
			return number;
		});

	const handleChange = (value) => {
		setValue(value);
		setDate(getDate(value._d));
	};

	return (
		<div className="view-student">
			<StudentInfo {...player} />

			<div className="graph">
				<div className="header">
					<IconButton onClick={handlePrev}>
						<img src={prevArrow} alt="previous" />
					</IconButton>
					<p>{graphs[index].name}</p>
					<IconButton onClick={handleNext}>
						<img src={nextArrow} alt="next" />
					</IconButton>
				</div>

				<div className="date-wrapper">
					<LocalizationProvider dateAdapter={AdapterMoment}>
						<DatePicker
							value={value}
							onChange={(newValue) => handleChange(newValue)}
							renderInput={(params) => <TextField {...params} size="small" />}
						/>
					</LocalizationProvider>
				</div>

				{cloneElement(graphs[index].component, { date })}
			</div>

			<Vitals />
		</div>
	);
}

export default ViewStudent;

const graphs = [
	{
		id: 1,
		name: 'Pedometer',
		component: <Pedometer />,
	},
	{
		id: 2,
		name: 'Heart Rate',
		component: <HeartRate />,
	},
	{
		id: 3,
		name: 'Blood Pressure',
		component: <></>,
	},
];
