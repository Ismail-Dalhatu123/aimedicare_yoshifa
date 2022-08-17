import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import StudentInfo from '../components/StudentInfo';
import Vitals from '../components/Vitals';
import Pedometer from '../components/Pedometer';
import prevArrow from '../assets/svg/prev-arrow.svg';
import nextArrow from '../assets/svg/next-arrow.svg';
import calender from '../assets/svg/calender.svg';
import axios from '../axios';

function ViewStudent() {
	const [player, setPlayer] = useState({
		fullname: '',
		gender: '',
		phoneNumber: '',
	});
	const [index, setIndex] = useState(0);
	const [value, setValue] = useState(new Date());

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
							onChange={(newValue) => {
								setValue(newValue);
							}}
							renderInput={(params) => (
								<TextField {...params} {...extraParams} />
							)}
						/>
					</LocalizationProvider>
				</div>

				{graphs[index].component}
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
		name: 'Heart rate monitor',
		component: <></>,
	},
	{
		id: 3,
		name: 'Blood oxygen',
		component: <></>,
	},
];

const extraParams = {
	size: 'small',
	InputProps: {
		endAdornment: (
			<InputAdornment position="end">
				<img src={calender} alt="calender" />
			</InputAdornment>
		),
	},
};
