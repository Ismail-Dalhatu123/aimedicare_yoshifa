import { ThemeProvider } from '@mui/material/styles';
import { theme } from './theme/theme';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Students from './pages/Students';
import C404 from './pages/404';
import ViewStudent from './pages/ViewStudent';
import Header from './components/Header';

function App() {
	return (
		<ThemeProvider theme={theme}>
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
		</ThemeProvider>
	);
}

export default App;
