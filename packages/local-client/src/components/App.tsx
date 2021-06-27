import {FunctionComponent} from 'react';
import {Provider} from 'react-redux';
import {store} from '../redux-utils';
import CellList from './CellList';

const App: FunctionComponent = () => {

	return (
		<Provider store={store}>
			<div>
				<CellList/>
			</div>
		</Provider>
	);
};

export default App;

