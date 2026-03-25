export interface RegisterCredentials {
	name: string;
	email: string;
}

export interface RegisterResponse {
	user: {
		id: string;
		username: string;
		email: string;
		token: string;
	};
}

export interface RegisterState {
	isLoading: boolean;
}
