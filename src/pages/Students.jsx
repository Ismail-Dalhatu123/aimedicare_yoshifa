import { useState } from 'react';
import Search from '../components/Search';
import Student from '../components/Student';
import { studentData } from '../data/students';

function Students() {
	const [render, setRender] = useState(studentData);

	const handleSearch = (query) =>
		setRender(
			studentData.filter((student) =>
				student.name.toLowerCase().includes(query.toLowerCase())
			)
		);

	return (
		<div className="students">
			<Search onChange={handleSearch} />

			<div className="s_list">
				{render.map((student) => (
					<Student {...student} key={student.id} />
				))}
			</div>
		</div>
	);
}

export default Students;
