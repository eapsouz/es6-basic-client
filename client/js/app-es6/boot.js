import {MainController} from './controllers/main-controller';
import {} from './polyfill/fetch';

let mainController = currentInstance();

document.querySelector('.form').onsubmit = mainController.adiciona.bind(mainController);
document.querySelector('[type=button]').onclick = mainController.apaga.bind(mainController);