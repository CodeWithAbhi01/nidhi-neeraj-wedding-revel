import fs from 'node:fs';
import path from 'node:path';

const outDir = path.resolve('.output/public');

if (!fs.existsSync(outDir)) {
  console.error(`Error: Output directory ${outDir} does not exist!`);
  process.exit(1);
}

const shellHtml = path.join(outDir, '_shell.html');
const indexHtml = path.join(outDir, 'index.html');
const notFoundHtml = path.join(outDir, '404.html');
const noJekyll = path.join(outDir, '.nojekyll');

if (fs.existsSync(shellHtml)) {
  fs.copyFileSync(shellHtml, indexHtml);
  fs.copyFileSync(shellHtml, notFoundHtml);
  console.log('✓ Successfully created index.html and 404.html from _shell.html');
} else {
  console.warn('⚠ _shell.html not found, checking if index.html already exists...');
}

fs.writeFileSync(noJekyll, '');
console.log('✓ Created .nojekyll for GitHub Pages');
console.log('🚀 GitHub Pages build ready in .output/public!');
