const fs = require('fs');
require('dotenv').config();
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

const argv = yargs(hideBin(process.argv)).argv;
const environment = argv.environment;

let apiURL;
let targetPath;

if (environment === 'prod') {
    apiURL = process.env.API_URL;
    targetPath = `./src/environments/environment.prod.ts`;
} else {
    apiURL = process.env.API_URL;
    targetPath = `./src/environments/environment.ts`;
}

const envConfigFile = `export const environment = {
  production: ${environment === 'prod'},
  apiUrl: "${apiURL}"
};
`;

fs.writeFile(targetPath, envConfigFile, function (err) {
    if (err) {
        console.error('Error:', err);
        process.exit(1);
    } else {
        console.log(`✅ ${targetPath} generado con API_URL=${apiURL}`);
    }
});
