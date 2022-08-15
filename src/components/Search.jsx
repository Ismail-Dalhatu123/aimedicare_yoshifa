function Search({ onChange }) {
	return (
		<div className="input">
			<input
				placeholder="Search by Player Name"
				onChange={(e) => onChange(e.target.value)}
				type="text"
			/>
			<div className="icon">
				<svg
					width="20"
					height="21"
					viewBox="0 0 20 21"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M9.58366 17.9998C13.9559 17.9998 17.5003 14.4554 17.5003 10.0832C17.5003 5.71092 13.9559 2.1665 9.58366 2.1665C5.2114 2.1665 1.66699 5.71092 1.66699 10.0832C1.66699 14.4554 5.2114 17.9998 9.58366 17.9998Z"
						stroke="white"
						strokeWidth="1.5"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
					<path
						d="M18.333 18.8335L15.833 16.3335"
						stroke="white"
						strokeWidth="1.5"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
			</div>
		</div>
	);
}

export default Search;
