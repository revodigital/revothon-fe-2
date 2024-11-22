/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tsconfigPaths from 'vite-tsconfig-paths'
import macrosPlugin from 'vite-plugin-babel-macros'

// https://vitejs.dev/config https://vitest.dev/config
export default defineConfig({
	plugins: [react(), tsconfigPaths(), macrosPlugin()],
	define: {
		global: {}
	},
	test: {
		globals: true,
		environment: 'happy-dom',
		setupFiles: '.vitest/setup',
		include: ['**/test.{ts,tsx}']
	}
})
