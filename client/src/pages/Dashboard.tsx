import { useAuthTokenStore } from '@/stores/auth-token.store';

export default function Dashboard() {
	const user = useAuthTokenStore((state) => state.user);

	return (
		<div>
			<h1>Dashboard</h1>
			<p>Welcome, {user?.name ?? 'User'}!</p>
		</div>
	);
}
