import {
	Action,
	DeleteCellAction,
	InsertCellAfterAction,
	MoveCellAction,
	UpdateCellAction,
} from '../actions';
import {ActionType} from '../action-types';
import {CellType, MoveCellDirection} from '../../types';
import {Dispatch} from 'redux';
import bundle from '../../bundler';
import axios from 'axios';
import {RootState} from '../reducers';

const updateCell = (id: string, content: string): UpdateCellAction => {
	return {
		type: ActionType.UPDATE_CELL,
		payload: {
			id,
			content,
		},
	};
};
const deleteCell = (id: string): DeleteCellAction => {
	return {
		type: ActionType.DELETE_CELL,
		payload: id,
	};
};
const moveCell = (id: string, direction: MoveCellDirection): MoveCellAction => {
	return {
		type: ActionType.MOVE_CELL,
		payload: {
			id,
			direction,
		},
	};
};
const insertCellAfter = (id: string | null,
						 cellType: CellType): InsertCellAfterAction => {
	return {
		type: ActionType.INSERT_CELL_AFTER,
		payload: {
			id,
			type: cellType,
		},
	};
};

const createBundle = (cellId: string, input: string) => {
	return async (dispatch: Dispatch<Action>) => {
		dispatch({
			type: ActionType.BUNDLE_START,
			payload: {
				cellId,
			},
		});

		const result = await bundle(input);

		dispatch({
			type: ActionType.BUNDLE_COMPLETE,
			payload: {
				cellId,
				bundle: result,
			},
		});
	};
};

const fetchCells = () => {
	return async (dispatch: Dispatch<Action>) => {
		dispatch({ type: ActionType.FETCH_CELLS });

		try {
			const {data} = await axios.get(`/cells`);

			dispatch({
				type: ActionType.FETCH_CELLS_COMPLETE,
				payload: data,
			});
		} catch (err) {
			dispatch({
				type: ActionType.FETCH_CELLS_ERROR,
				payload: err.message,
			});
		}
	};
};

const saveCells = () => {
	return async (dispatch: Dispatch<Action>, getState: () => RootState) => {
		const { cells: {data, order}} = getState();
		const cells = order.map((id: string) => data[id]);

		try {
			await axios.post(`/cells`, { cells });
		} catch (err) {
			dispatch({
				type: ActionType.SAVE_CELLS_ERROR,
				payload: err.message,
			})
		}
	};
};

export {
	updateCell,
	deleteCell,
	moveCell,
	insertCellAfter,
	createBundle,
	fetchCells,
	saveCells
};

