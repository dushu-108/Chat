import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	root: resolve(__dirname),
	base: '/',
	build: {
		outDir: resolve(__dirname, '../public'),
		emptyOutDir: true
	},
	server: {
		port: 3000,
		proxy: {
			"/api": {
				target: "http://localhost:4000",
			},
		},
	}
});
