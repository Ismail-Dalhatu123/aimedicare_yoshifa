import aimedicare from '../assets/svg/aimedicare_logo.svg';
import yoshifa from '../assets/png/yoshifa.png';

function Header() {
	return (
		<header>
			<img src={aimedicare} alt="AiMeidicare" />
			<h2>AiMedicare / Yoshi Academy 2022 </h2>
			<img src={yoshifa} alt="Yoshi football academy" />
		</header>
	);
}

export default Header;
