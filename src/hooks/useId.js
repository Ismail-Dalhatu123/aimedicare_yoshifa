import { useLocation } from 'react-router';

export const useId = () => {
	return useLocation().pathname.split('/').pop();
};
