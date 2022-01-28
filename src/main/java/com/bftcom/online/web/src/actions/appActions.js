/**
 * Redux-экшены для редьюсера app
 */

import {APP} from '../constants';

/**
 * Инициализация пользователя.
 * @returns {function(*)}
 */
export function initUser(user, password) {
    return (dispatch) => {

        fetch('/auth', { headers: { 'Authorization': 'Basic ' + window.btoa(user + ":" + password)}})
            .then((response)=>{
                dispatch({
                    type: APP.USER,
                    user: response.status === 200 ? user: undefined
                })
            })
            .catch((error) => {
                console.error('Error:', error);
                dispatch({
                    type: APP.USER,
                    user: undefined,
                })
            });
    }
}

/**
 * Удаление пользователя.
 * @returns {function(*)}
 */
export function disposeUser(user, password) {
    return (dispatch) => {
        dispatch({
            type: APP.USER,
            user: undefined
        })
    }
}