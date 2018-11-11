import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';

import { initStart } from '../modules/application/actions';

export default (rootReducer, rootSaga) => {
  const middlewares = [];

  const sagaMiddleware = createSagaMiddleware();

  middlewares.push(sagaMiddleware);

  const store = createStore(
    rootReducer,
    {},
    composeWithDevTools(applyMiddleware(...middlewares))
  );

  sagaMiddleware.run(rootSaga);

  store.dispatch(initStart());

  return store;
};
