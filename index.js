import App from './classes/app.js';
new App();

import { getMoveFromExternalAI } from "./miner.js";

console.log(await getMoveFromExternalAI(1, ''));