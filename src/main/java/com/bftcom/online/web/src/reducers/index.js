/**
 * Корневой редьюсер, собирает все вложенные редьюсеры
 */

import {combineReducers} from 'redux';
import appState from './appState';

export const rootReducer = combineReducers({
    appState
})