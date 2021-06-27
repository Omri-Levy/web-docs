import {Dispatch} from 'redux';
import {Action} from '../actions';
import {ActionType} from '../action-types';
import {saveCells} from '../action-creators';
import {RootState} from '../reducers';

const saveCellsMiddleware = ({
								 dispatch,
								 getState
							 }: {
	dispatch: Dispatch<Action>,
	getState: () => RootState
}) => {
	let timer: NodeJS.Timeout;

	return (next: (action: Action) => void) => {
		return (action: Action) => {
			next(action);

			if (timer) {
				clearTimeout(timer);
			}

			switch (action.type) {
				case ActionType.INSERT_CELL_AFTER:
				case ActionType.UPDATE_CELL:
				case ActionType.DELETE_CELL:
				case ActionType.MOVE_CELL:
					timer = setTimeout(() => {
						saveCells()(dispatch, getState);
					}, 250);

					return;
				default:
					return;
			}
		}
	}
};

export default saveCellsMiddleware;
