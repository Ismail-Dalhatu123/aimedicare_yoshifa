import { useEffect, useMemo, useState } from 'react';
import Search from '../components/Search';
import StudentCard from '../components/StudentCard';
import axios from '../axios';

function Students() {
	const [studentList, setStudentList] = useState([]);
	const [query, setQuery] = useState();

	useEffect(() => {
		axios
			.get('/v1/players')
			.then((res) => setStudentList(res.data.data.players));
	}, []);

	const getFilteredData = (filter, items) => {
		if (!filter) {
			return items;
		}

		return items.filter((item) => item.fullName.includes(filter));
	};

	const filteredData = useMemo(
		() => getFilteredData(query, studentList),
		[query, studentList]
	);

	return (
		<div className="students">
			<Search onChange={setQuery} />

			<div className="s_list">
				{filteredData.map((student) => (
					<StudentCard {...student} key={student.id} />
				))}
			</div>
		</div>
	);
}

export default Students;
