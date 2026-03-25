export interface RegisterCredentials {
	username: string;
	email: string;
	password: string;
	confirmPassword: string;
}

export interface RegisterResponse {
	token: string;
	user: {
		id: string;
		email: string;
		username: string;
	};
}

export interface RegisterState {
	isLoading: boolean;
	error: string | null;
}
