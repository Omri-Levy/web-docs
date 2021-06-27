import {FunctionComponent} from 'react';
import useActions from '../hooks/useActions';
import ActionButton from './ActionButton';
import './action-bar.css';

interface Props {
	cellId: string;
};

const ActionBar: FunctionComponent<Props> = ({cellId}) => {
	const {deleteCell, moveCell} = useActions();

	return (
		<div className={`action-bar`}>
			<ActionButton
				onClick={() => moveCell(cellId, `up`)}
				icon={`arrow-up`}
			/>
			<ActionButton
				onClick={() => moveCell(cellId, `down`)}
				icon={`arrow-down`}
			/>
			<ActionButton
				onClick={() => deleteCell(cellId)}
				icon={`times`}
			/>
		</div>
	);
};

export default ActionBar;
