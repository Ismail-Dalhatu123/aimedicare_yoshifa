import CircularProgress from '@mui/material/CircularProgress';

function Reading({ icon, name, value, minValue = 0, maxValue }) {
	const progress = Math.round((value / maxValue) * 100);

	return (
		<div className="reading">
			<div className="title-wrapper">
				<img src={icon} alt={name} />
				<p>{name}</p>
			</div>

			<div className="circular-progress">
				<CircularProgress
					variant="determinate"
					value={progress}
					size={70}
					thickness={5}
				/>
			</div>

			<div className="progress-wrapper">
				<p>{progress}%</p>
			</div>

			<div className="value-wrapper">
				<p>
					<span>{value}</span> {name}
				</p>
			</div>
		</div>
	);
}

export default Reading;
