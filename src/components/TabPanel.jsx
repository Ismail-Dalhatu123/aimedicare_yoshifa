function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			{...other}
			style={{ margin: 'auto' }}
		>
			{value === index && <>{children}</>}
		</div>
	);
}

export default TabPanel;
