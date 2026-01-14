const fs = require('fs');
require('dotenv').config();
const { argv } = require('yargs');
const environment = argv.environment;

let apiURL;
let targetPath;

if (environment === 'prod') {
    apiURL = process.env.API_URL || 'https://rickandmortyapi.com/api';
    targetPath = `./src/environments/environment.prod.ts`;
} else {
    apiURL = process.env.API_URL || 'https://rickandmortyapi.com/api';
    targetPath = `./src/environments/environment.ts`;
}

const envConfigFile = `export const environment = {
  production: ${environment === 'prod'},
  apiUrl: "${apiURL}"
};
`;

fs.writeFile(targetPath, envConfigFile, function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log(`✅ ${targetPath} generado con API_URL=${apiURL}`);
    }
});
