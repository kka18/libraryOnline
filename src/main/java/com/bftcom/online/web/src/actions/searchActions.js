/**
 * Redux-экшены для редьюсера app
 */

import {APP} from '../constants';

/**
 * Поиск.
 * @returns {function(*)}
 */
export function search(keyword) {
    return (dispatch) => {

        fetch('/api/books/search?search='+keyword)
            .then(response => response.json())
            .then(data => {

                dispatch({
                    type: APP.SEARCH,
                    search: data
                })

            })
            .catch((error) => {
                console.error('Error:', error);
                dispatch({
                    type: APP.SEARCH,
                    search: undefined,
                })
            });
    }
}