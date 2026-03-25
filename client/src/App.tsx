import { Route, Routes } from 'react-router-dom';
import { CommonLayout } from './layouts';
import { Home, Login, Register } from './pages';

function App() {
	return (
		<Routes>
			<Route element={<CommonLayout />}>
				<Route index element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
			</Route>
		</Routes>
	);
}

export default App;
