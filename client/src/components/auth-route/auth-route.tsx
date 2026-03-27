import { Navigate } from 'react-router-dom';
import { useAuthTokenStore } from '@/stores/auth-token.store';

interface AuthRouteProps {
	children: React.ReactNode;
}

/**
 * Guard component that redirects authenticated users away from public auth pages.
 * If the stored token has been validated (isAuthenticated = true), the user is
 * redirected to `/` (Home/Dashboard).
 */
export function AuthRoute({ children }: AuthRouteProps) {
	const isAuthenticated = useAuthTokenStore((state) => state.isAuthenticated);

	if (isAuthenticated) {
		return <Navigate to="/" replace />;
	}

	return <>{children}</>;
}
