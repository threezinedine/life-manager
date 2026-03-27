import { Navigate } from 'react-router-dom';
import { useAuthTokenStore } from '@/stores/auth-token.store';

interface ProtectedRouteProps {
	children: React.ReactNode;
}

/**
 * Guard component that redirects unauthenticated users away from protected pages.
 * The user must have a validated token (isAuthenticated = true) to access the
 * route. If not authenticated, the stored token is cleared and the user is
 * redirected to `/login`.
 */
export function ProtectedRoute({ children }: ProtectedRouteProps) {
	const isAuthenticated = useAuthTokenStore((state) => state.isAuthenticated);
	const isValidating = useAuthTokenStore((state) => state.isValidating);
	const clearAuth = useAuthTokenStore((state) => state.clearAuth);

	// Wait for validation to complete before redirecting
	if (isValidating) return null;

	if (!isAuthenticated) {
		clearAuth();
		return <Navigate to="/login" replace />;
	}

	return <>{children}</>;
}
