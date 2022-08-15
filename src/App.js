import Header from './components/Header';
import Students from './pages/Students';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import C404 from './pages/404';
import ViewStudent from './pages/ViewStudent';

function App() {
	return (
		<BrowserRouter>
			<div className="app">
				<Header />
				<div className="routes">
					<Routes>
						<Route path="/" element={<Students />} />
						<Route path="/students/:id/*" element={<ViewStudent />} />
						<Route path="*" element={<C404 />} />
					</Routes>
				</div>
			</div>
		</BrowserRouter>
	);
}

export default App;
