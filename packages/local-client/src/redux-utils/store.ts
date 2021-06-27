import {applyMiddleware, compose, createStore} from 'redux';
import reducers from './reducers';
import thunk from 'redux-thunk';
import saveCellsMiddleware from './middlewares/save-cells-middleware';

const composeEnhancers =
	typeof window === 'object' &&
	// @ts-ignore
	window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
		// @ts-ignore
		window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
			// Specify extension’s options like name, actionsBlacklist,
			// actionsCreators, serialize...
		}) : compose;

const enhancer = composeEnhancers(
	applyMiddleware(thunk),
	applyMiddleware(saveCellsMiddleware),
);
const store = createStore(
	reducers,
	{},
	enhancer,
);

export {store};
