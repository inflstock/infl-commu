import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import reducer from './reducer';
import sagas from './sagas';

const configureStore = (initialState: any, services = {}) => {
  const sagaMiddleware = createSagaMiddleware()

  const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const enhancers = [
    applyMiddleware(
      sagaMiddleware,
    ),
  ]

  const store = createStore(reducer, initialState, composeEnhancers(...enhancers))

  sagaMiddleware.run(sagas, services);

  return store;
}

export default configureStore;