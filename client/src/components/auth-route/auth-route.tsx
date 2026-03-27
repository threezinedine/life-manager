import { Navigate } from 'react-router-dom';
import { useAuthTokenStore } from '@/stores/auth-token.store';

interface AuthRouteProps {
	children: React.ReactNode;
}

/**
 * Guard component that redirects authenticated users away from public auth pages.
 * If a token exists in storage, the user is redirected to `/` (Home/Dashboard).
 */
export function AuthRoute({ children }: AuthRouteProps) {
	const token = useAuthTokenStore((state) => state.token);

	if (token) {
		return <Navigate to="/" replace />;
	}

	return <>{children}</>;
}
