export interface RefreshCredentials {
	email: string;
	oldToken: string;
}

export interface RefreshResponse {}

export interface RefreshState {
	isLoading: boolean;
}
