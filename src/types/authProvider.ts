
export interface AuthUser {
	id: string

	[key: string]: any
}

export interface AuthProvider {
	isAuthenticated: () => Promise<boolean>
	login: (username: string, password: string) => Promise<void>
	logout: () => Promise<void>
	requestResetPassword?: (username: string) => Promise<void>
	resetPassword?: (resetToken: string, newPassword: string) => Promise<void>
	getCurrentUser: () => Promise<AuthUser | null>
}