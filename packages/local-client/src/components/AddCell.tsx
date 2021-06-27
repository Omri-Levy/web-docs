import {FunctionComponent} from 'react';
import './add-cell.css';
import useActions from '../hooks/useActions';
import AddButton from './AddButton';

interface Props {
	previousCellId: string | null;
	forceVisible?: boolean;
}

const AddCell: FunctionComponent<Props> = ({previousCellId, forceVisible}) => {
	const {insertCellAfter} = useActions();

	return (
		<div className={`add-cell ${forceVisible && `force-visible`}`}>
			<div className={`add-buttons`}>
				<AddButton
					onClick={() => insertCellAfter(previousCellId, `code`)}
				>
					Code
				</AddButton>
				<AddButton
					onClick={() => insertCellAfter(previousCellId, `text`)}
				>
					Text
				</AddButton>
			</div>
			<div className={`divider`}/>
		</div>
	);
};

export default AddCell;

