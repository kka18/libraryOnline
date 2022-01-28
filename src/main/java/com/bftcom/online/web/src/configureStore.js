import {createStore, applyMiddleware} from 'redux';
import {rootReducer} from './reducers';

import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';

/**
 * Создание редьюсеров для приложения
 */
export default function configureStore(initialState) {
    const loadLogger = false;
    let mws = loadLogger ? [thunk] : [thunk];

    const store = createStore(
        rootReducer,
        initialState,
        composeWithDevTools(
            applyMiddleware(...mws)
        )
    );

    if (module.hot) {
        module.hot.accept('./reducers', () => {
            const nextRootReducer = require('./reducers').rootReducer;
            store.replaceReducer(nextRootReducer)
        });
    }

    return store
}