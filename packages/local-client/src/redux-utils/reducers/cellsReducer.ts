import {Cell} from '../../types';
import {ActionType} from '../action-types';
import {Action} from '../actions';
import produce from 'immer';

interface CellsState {
	loading: boolean;
	error: string | null;
	order: string[];
	data: {
		[key: string]: Cell
	}
}

const initialState: CellsState = {
	loading: false,
	error: null,
	order: [],
	data: {},
};

// returning state to satisfy Typescript
const cellsReducer = produce(
	(state = initialState, action: Action): CellsState | void => {
		switch (action.type) {
			case ActionType.UPDATE_CELL:
				const {id, content} = action.payload;

				state.data[id].content = content;

				return state;
			case ActionType.DELETE_CELL:
				delete state.data[action.payload];
				state.order = state.order.filter(
					(cellId: string) => cellId !== action.payload,
				);

				return state;
			case ActionType.MOVE_CELL:
				const {direction} = action.payload;
				const index = state.order.findIndex(
					(indexId: string) => indexId === action.payload.id,
				);
				const targetIndex = direction === `up` ? index - 1 : index + 1;

				if (targetIndex < 0 || targetIndex > state.order.length - 1) {
					return;
				}

				state.order[index] = state.order[targetIndex];
				state.order[targetIndex] = action.payload.id;

				return state;
			case ActionType.INSERT_CELL_AFTER:
				const cell: Cell = {
					content: ``,
					type: action.payload.type,
					id: randomId(),
				};

				state.data[cell.id] = cell;

				const foundIndex = state.order.findIndex(
					(indexId: string) => indexId === action.payload.id,
				);

				if (foundIndex < 0) {
					state.order.unshift(cell.id);
				} else {
					state.order.splice(foundIndex + 1, 0, cell.id);
				}

				return state;
			case ActionType.FETCH_CELLS:
				state.loading = true;
				state.error = null;

				return state;
			case ActionType.FETCH_CELLS_COMPLETE:
				// naming to avoid shadowing and confusion due to repeated names
				// orderItem is a cell
				state.order = action.payload?.map((orderItem) => orderItem?.id);
				// dataItem is a cell
				state.data = action.payload?.reduce((acc, dataItem) => {
					acc[dataItem?.id] = dataItem;

					return acc;
				}, {} as CellsState['data']);

				return state;
			case ActionType.FETCH_CELLS_ERROR:
				state.loading = true;
				state.error = action.payload;

				return state;

			case ActionType.SAVE_CELLS_ERROR:
				state.error = action.payload;

				return state;
			default:
				return state;
		}
	},
);

export default cellsReducer;

const randomId = () => Math.random().toString(36).substr(2, 5);
