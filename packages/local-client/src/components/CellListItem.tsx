import {FunctionComponent} from 'react';
import {Cell} from '../types';
import CodeCell from './CodeCell';
import TextEditor from './TextEditor';
import ActionBar from './ActionBar';
import './cell-list-item.css';

interface Props {
	cell: Cell;
}

const CellListItem: FunctionComponent<Props> = ({cell}) => {
	let child: JSX.Element;

	if (cell.type === `code`) {
		child = (
			<>
				<div className={`action-bar-wrapper`}>
					<ActionBar cellId={cell.id}/>
				</div>
				<CodeCell cell={cell}/>
			</>
		);
	} else {
		child = (
			<>
				<TextEditor cell={cell}/>
				<ActionBar cellId={cell.id}/>
			</>
		);
	}

	return (
		<div className={`cell-list-item`}>
			{child}
			{/* displays top right of the child */}
			<ActionBar cellId={cell.id}/>
		</div>
	);
};

export default CellListItem;
