import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { CommonLayout } from './layouts';
import { Home, Login, Register, Refresh, Dashboard } from './pages';
import { AuthRoute } from './components/auth-route';
import { ProtectedRoute } from './components/protected-route';
import { useAuthTokenStore } from '@/stores/auth-token.store';

function App() {
	const validate = useAuthTokenStore((state) => state.validate);
	const isValidating = useAuthTokenStore((state) => state.isValidating);

	useEffect(() => {
		validate();
	}, [validate]);

	if (isValidating) {
		return null;
	}

	return (
		<Routes>
			<Route element={<CommonLayout />}>
				<Route index element={<Home />} />
				<Route
					path="/dashboard"
					element={
						<ProtectedRoute>
							<Dashboard />
						</ProtectedRoute>
					}
				/>
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
