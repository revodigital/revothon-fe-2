import { defineConfig } from '@hey-api/openapi-ts'

export default defineConfig({
	client: '@hey-api/client-axios',
	input:
		'./src/api-read-license/openapi.yaml',
	output: {
		format: 'prettier',
		path: './src/api-read-license/client'
	}
})