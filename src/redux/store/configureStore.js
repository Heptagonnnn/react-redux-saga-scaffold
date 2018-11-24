import {createStore, applyMiddleware, compose} from 'redux';
import rootReducer from "../reducers";
import createSagaMiddleware from 'redux-saga';
import rootSaga from "../effects";

const sagaMiddleware = createSagaMiddleware();


const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    }) : compose;


const enhancer = composeEnhancers(
  applyMiddleware(sagaMiddleware),
);


const configureStore = createStore(
  rootReducer,
  enhancer
);


sagaMiddleware.run(rootSaga);

export default configureStore;