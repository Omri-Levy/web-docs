import {useDispatch} from 'react-redux';
import {bindActionCreators} from 'redux';
import {actionCreators} from '../redux-utils';
import {useMemo} from 'react';

const useActions = () => {
	const dispatch = useDispatch();

	return (
		useMemo(() => bindActionCreators(actionCreators, dispatch), [dispatch])
	);
};

export default useActions;

