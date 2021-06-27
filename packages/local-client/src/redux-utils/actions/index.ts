import {ActionType} from '../action-types';
import {Cell, CellType, MoveCellDirection} from '../../types';

interface MoveCellAction {
	type: ActionType.MOVE_CELL;
	payload: {
		id: string;
		direction: MoveCellDirection;
	}
}

interface DeleteCellAction {
	type: ActionType.DELETE_CELL;
	payload: string;
}

interface InsertCellAfterAction {
	type: ActionType.INSERT_CELL_AFTER;
	payload: {
		id: string | null;
		type: CellType;
	};
}

interface UpdateCellAction {
	type: ActionType.UPDATE_CELL;
	payload: {
		id: string;
		content: string;
	}
}

interface BundleStartAction {
	type: ActionType.BUNDLE_START;
	payload: {
		cellId: string;
	}
}

interface BundleCompleteAction {
	type: ActionType.BUNDLE_COMPLETE;
	payload: {
		cellId: string;
		bundle: {
			code: string;
			error: string;
		};
	}
}

interface FetchCellsAction {
	type: ActionType.FETCH_CELLS;
}

interface FetchCellsCompleteAction {
	type: ActionType.FETCH_CELLS_COMPLETE;
	payload: Cell[]
}

interface FetchCellsErrorAction {
	type: ActionType.FETCH_CELLS_ERROR;
	payload: string;
}

interface SaveCellsErrorAction {
	type: ActionType.SAVE_CELLS_ERROR;
	payload: string;
}

type Action = MoveCellAction
	| DeleteCellAction
	| InsertCellAfterAction
	| UpdateCellAction
	| BundleStartAction
	| BundleCompleteAction
	| FetchCellsAction
	| FetchCellsCompleteAction
	| FetchCellsErrorAction
	| SaveCellsErrorAction;

export type {
	Action,
	MoveCellAction,
	DeleteCellAction,
	InsertCellAfterAction,
	UpdateCellAction,
	BundleStartAction,
	BundleCompleteAction,
	FetchCellsAction,
	FetchCellsCompleteAction,
	FetchCellsErrorAction,
	SaveCellsErrorAction
};
