import {defineConfig} from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import react from '@vitejs/plugin-react-swc';
import {nodePolyfills} from "vite-plugin-node-polyfills";

export default defineConfig({
	base: '/tokenon/',
	plugins: [react(), tsconfigPaths(), nodePolyfills(),],
	publicDir: './public',
});

