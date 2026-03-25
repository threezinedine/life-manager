export interface RegisterCredentials {
	username: string;
	email: string;
}

export interface RegisterResponse {
	token: string;
}

export interface RegisterState {
	isLoading: boolean;
}
