import { Route, Routes } from 'react-router-dom';
import { CommonLayout } from './layouts';
import { Home, Login, Register, Refresh } from './pages';
import { AuthRoute } from './components/auth-route';

function App() {
	return (
		<Routes>
			<Route element={<CommonLayout />}>
				<Route index element={<Home />} />
				<Route
					path="/login"
					element={
						<AuthRoute>
							<Login />
						</AuthRoute>
					}
				/>
				<Route
					path="/register"
					element={
						<AuthRoute>
							<Register />
						</AuthRoute>
					}
				/>
				<Route path="/refresh" element={<Refresh />} />
			</Route>
		</Routes>
	);
}

export default App;
