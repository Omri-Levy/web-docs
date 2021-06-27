import {Fragment, FunctionComponent, useEffect} from 'react';
import useTypedSelector from '../hooks/useTypedSelector';
import CellListItem from './CellListItem';
import {Cell} from '../types';
import AddCell from './AddCell';
import './cell-list.css';
import useActions from '../hooks/useActions';

const CellList: FunctionComponent = () => {
	const {fetchCells} = useActions();
	const cells = useTypedSelector(({cells: {order, data}}) => (
			order.map((id: string) => (
					data[id]
				),
			)
		),
	) as Cell[];

	useEffect(() => {
		fetchCells();
	}, []);

	const renderedCells = cells?.map((cell) => (
			<Fragment key={cell.id}>
				<CellListItem cell={cell}/>
				<AddCell previousCellId={cell.id}/>
			</Fragment>
		),
	);

	return (
		<div className={`cell-list`}>
			<AddCell previousCellId={null} forceVisible={cells?.length === 0}/>
			{renderedCells}
		</div>
	);
};

export default CellList;

