import {APP} from './../constants';

const initialState = {
    user: undefined,
    search: undefined
}

/**
 * Редьюсер приложения. *
 * USER - Пользователь
 * SEARCH - Поиск
 */
export default function appState(state = initialState, action) {
    switch(action.type) {
        case APP.USER:
            return {...state, user:action.user};
        case APP.SEARCH:
            return {...state, search:action.search};
        default:
            return state;
    }
}