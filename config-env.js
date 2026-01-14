const fs = require('fs');
const path = require('path');
require('dotenv').config();
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

const argv = yargs(hideBin(process.argv)).argv;
const environment = argv.environment;

const apiURL = process.env.API_URL;
const envDir = './src/environments';

if (!fs.existsSync(envDir)) {
    fs.mkdirSync(envDir, { recursive: true });
}

const envDevFile = `export const environment = {
  production: false,
  apiUrl: "${apiURL}"
};
`;

const envProdFile = `export const environment = {
  production: true,
  apiUrl: "${apiURL}"
};
`;

fs.writeFileSync(`${envDir}/environment.ts`, envDevFile);
console.log(`✅ ${envDir}/environment.ts generado con API_URL=${apiURL}`);

fs.writeFileSync(`${envDir}/environment.prod.ts`, envProdFile);
console.log(`✅ ${envDir}/environment.prod.ts generado con API_URL=${apiURL}`);
