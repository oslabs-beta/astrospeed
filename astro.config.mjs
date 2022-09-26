import { defineConfig } from 'astro/config';
import astroSingleFile from 'astro-single-file';


// https://astro.build/config
export default defineConfig({
  integrations: [astroSingleFile()],
  // outDir: '../../astrospeed'
  // site: './'
  // build.assetsDir: 'assetsa'
});

