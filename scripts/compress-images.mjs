import { execSync } from 'child_process';
import { statSync } from 'fs';

console.log('Compressing logo.png to 56x56...');
execSync('sips -z 56 56 public/logo.png --out public/logo-56.png');
execSync('mv public/logo-56.png public/logo.png');

console.log('Compressing icon.png to 180x180...');
execSync('sips -z 180 180 app/icon.png --out app/icon-180.png');
execSync('mv app/icon-180.png app/icon.png');

const logoStat = statSync('public/logo.png');
const iconStat = statSync('app/icon.png');

console.log(`New public/logo.png size: ${(logoStat.size / 1024).toFixed(2)} KB`);
console.log(`New app/icon.png size: ${(iconStat.size / 1024).toFixed(2)} KB`);
