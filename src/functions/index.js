export const getDate = (date = new Date()) =>
	`${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;

export const getTime = (date) =>
	`${
		(date.getHours() + 24) % 12 || 12
	}:${date.getMinutes()}:${date.getSeconds()}`;
