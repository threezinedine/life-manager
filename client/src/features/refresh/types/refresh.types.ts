export interface RefreshCredentials {
	email: string;
	oldToken: string;
}

export interface RefreshResponse {
	token: string;
}

export interface RefreshState {
	isLoading: boolean;
}
