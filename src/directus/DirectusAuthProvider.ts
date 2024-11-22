import { AuthProvider, AuthUser } from '../types/authProvider'
import {
	authentication,
	AuthenticationClient,
	AuthenticationData,
	AuthenticationStorage,
	createDirectus,
	DirectusClient,
	passwordRequest,
	passwordReset,
	readMe,
	rest,
	RestClient
} from '@directus/sdk'

// Utility function to manage authentication data in localStorage
const authLocalStorage = (mainKey: string = 'directus_storage') =>
	({
		// implementation of get, here return json parsed data from localStorage at mainKey (or null if not found)
		get: async () => {
			const data = window.localStorage.getItem(mainKey)
			if (data) {
				return JSON.parse(data)
			}
			return null
		},
		// implementation of set, here set the value at mainKey in localStorage, or remove it if value is null
		set: async (value: AuthenticationData | null) => {
			if (!value) {
				return window.localStorage.removeItem(mainKey)
			}
			return window.localStorage.setItem(mainKey, JSON.stringify(value))
		}
	}) as AuthenticationStorage

/**
 * DirectusAuthProvider
 *
 * This class serves as an authentication provider for managing user sessions and interacting
 * with a Directus backend. It implements the `AuthProvider` interface, providing methods for
 * logging in, logging out, checking authentication status, and handling password resets.
 *
 * ### Features:
 * 1. **Directus Integration**: Uses the Directus SDK to enable seamless communication with a Directus backend.
 * 2. **Token Management**: Utilizes a custom `authLocalStorage` implementation to store authentication
 *    tokens in `localStorage`, ensuring they persist across sessions.
 * 3. **Automatic Token Refresh**: Configures the Directus client to automatically refresh tokens
 *    30 seconds before they expire.
 * 4. **REST API Support**: Adds REST API capabilities to the Directus client for custom requests.
 * 5. **Authentication Utilities**:
 *    - Check if the user is authenticated (`isAuthenticated`).
 *    - Log in and log out users (`login`, `logout`).
 *    - Manage password reset flows (`requestResetPassword`, `resetPassword`).
 *    - Fetch the currently authenticated user's details (`getCurrentUser`).
 *
 * ### Expected Usage:
 * 1. Instantiate the `DirectusAuthProvider` with the Directus API URL.
 *    ```typescript
 *    const authProvider = new DirectusAuthProvider('https://example.directus.io');
 *    ```
 * 2. Use the provider to manage authentication flows in your application:
 *    ```typescript
 *    await authProvider.login('username', 'password'); // Log in a user
 *    const user = await authProvider.getCurrentUser(); // Fetch user details
 *    ```
 * 3. Access the underlying Directus client instance for custom API calls:
 *    ```typescript
 *    const directus = authProvider.getDirectusInstance();
 *    const items = await directus.items('example').readMany();
 *    ```
 *
 * ### Singleton Pattern:
 * While this implementation allows multiple instances of `DirectusAuthProvider`, it can easily
 * be adapted to a singleton pattern if required by the application.
 *
 * ### Notes:
 * - The `directus` instance is encapsulated within the class but can be accessed externally via
 *   the `getDirectusInstance` method.
 * - This implementation assumes a JSON-based authentication strategy (`'json'`).
 * - Extendable to include more Directus SDK functionalities if needed.
 */
export class DirectusAuthProvider implements AuthProvider {
	// Private Directus instance, combining various functionalities like authentication and REST API
	private directus: DirectusClient<any> & AuthenticationClient<any> & RestClient<any>

	// Constructor to initialize the Directus client with the given API URL and authentication configuration
	constructor(apiUrl: string) {
		this.directus = createDirectus(apiUrl)
			.with(
				authentication('json', {
					autoRefresh: true, // Automatically refresh tokens before expiration
					msRefreshBeforeExpires: 30000, // Refresh tokens 30 seconds before they expire
					storage: authLocalStorage() // Use custom localStorage for token management
				})
			)
			.with(rest())
	}

	// Check if the user is authenticated by verifying the existence of a valid token
	async isAuthenticated(): Promise<boolean> {
		const token = await this.directus.getToken()
		return !!token
	}

	// Log in a user using their username and password
	async login(username: string, password: string): Promise<void> {
		await this.directus.login(username, password)
	}

	// Log out the currently authenticated user
	async logout(): Promise<void> {
		await this.directus.logout()
	}

	// Request a password reset for the given username
	async requestResetPassword(username: string): Promise<void> {
		await this.directus.request(passwordRequest(username))
	}

	// Reset the user's password using a reset token and the new password
	async resetPassword(resetToken: string, newPassword: string): Promise<void> {
		await this.directus.request(passwordReset(resetToken, newPassword))
	}

	// Retrieve the current authenticated user's information
	async getCurrentUser(): Promise<AuthUser | null> {
		try {
			const user = await this.directus.request(readMe())
			return user as AuthUser
		} catch {
			return null
		}
	}

	// Public getter to expose the internal Directus client instance
	public getDirectusInstance() {
		return this.directus;
	}

}
