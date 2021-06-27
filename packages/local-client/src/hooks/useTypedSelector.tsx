import {TypedUseSelectorHook, useSelector} from 'react-redux';
import {RootState} from '../redux-utils';

const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export default useTypedSelector;
