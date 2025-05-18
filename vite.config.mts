import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
	plugins: [preact(), tailwindcss()],
	build: {
		rollupOptions: {
			input: {
				main: "./src/action.html",
				contentScript: "./src/content-script/contentScript.ts",
			},
			output: {
				entryFileNames: "assets/[name].js",
				chunkFileNames: "assets/[name].js",
				assetFileNames: "assets/[name].[ext]",
			},
		},
	},
});
