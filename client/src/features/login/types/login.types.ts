export interface LoginCredentials {
	email: string;
	password: string;
}

export interface LoginResponse {
	token: string;
	user: {
		id: string;
		email: string;
		username: string;
	};
}

export interface LoginState {
	isLoading: boolean;
	error: string | null;
}
