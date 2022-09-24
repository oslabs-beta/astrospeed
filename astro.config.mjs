import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
	//CHANGE THIS TO SERVER BEFORE DEPLOYING!!!!
	// output:'static',
	integrations: [tailwind()],
});
