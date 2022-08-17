import { faker } from '@faker-js/faker';

export const studentData = new Array(25).fill('').map((student) => {
	const firstName = faker.name.firstName();
	const lastName = faker.name.lastName();

	return {
		id: faker.random.numeric(5),
		image: faker.internet.avatar(),
		firstName: firstName,
		lastName: lastName,
		email: faker.internet.email(firstName, lastName),
		phone: faker.phone.number('0803 ### ####'),
		age: 16,
		active: faker.random.numeric() > 5,
	};
});
