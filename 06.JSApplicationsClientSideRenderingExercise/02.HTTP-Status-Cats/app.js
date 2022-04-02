import {render} from './node_modules/lit-html/lit-html.js';
import { getTemplate } from './templateHandler.js';

render(getTemplate(), document.getElementById('allCats'));