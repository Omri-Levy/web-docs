import produce from 'immer';
import {Action} from '../actions';
import {ActionType} from '../action-types';

interface BundleState {
	[key: string]: {
		loading: boolean;
		code: string;
		error: string;
	} | undefined
}

const initialState: BundleState = {};

// returning state to satisfy Typescript
const bundlesReducer = produce(
	(state = initialState, action: Action): BundleState | void => {
		switch (action.type) {
			case ActionType.BUNDLE_START:
				state[action.payload.cellId] = {
					loading: true,
					code: ``,
					error: ``,
				};

				return state;
			case ActionType.BUNDLE_COMPLETE:
				state[action.payload.cellId] = {
					loading: false,
					code: action.payload.bundle.code,
					error: action.payload.bundle.error,
				};

				return state;
			default:
				return state;
		}
	});

export default bundlesReducer;
