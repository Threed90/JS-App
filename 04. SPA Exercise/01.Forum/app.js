import { router } from './src/router.js';
import {listener} from './src/eventListener.js'

router['/']();

listener.loadHomePageEvent();
listener.loadHomePageFormEvent();
