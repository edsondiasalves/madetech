import fs from 'fs';
import path from 'path';

const srcDir = '/home/edson/.gemini/antigravity/brain/b2d8cacf-8887-4101-be24-ebb243b6cb09';
const destDir = '/home/edson/projects/madetech/public/assets';

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

fs.copyFileSync(`${srcDir}/madetech_logo_1786836265172.png`, `${destDir}/madetech-logo.png`);
fs.copyFileSync(`${srcDir}/bestgym_icon_1786836276384.png`, `${destDir}/bestgym-icon.png`);
fs.copyFileSync(`${srcDir}/scrutinium_icon_1786836288142.png`, `${destDir}/scrutinium-icon.png`);

console.log('Assets copied successfully!');
