import { svelte } from '@sveltejs/vite-plugin-svelte';
import { defineConfig } from 'vite';

export default defineConfig({
	build: {
		lib: {
			entry: 'src/main.ts',
			name: 'web_component_svelte',
			fileName: 'web-component-svelte',
			formats: ['iife']
		}
	},
	plugins: [svelte()]
});
