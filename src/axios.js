import axios from 'axios';

const instance = axios.create({
	baseURL: 'https://api-aimedicare-yoshifa.herokuapp.com/api',
});

export default instance;
