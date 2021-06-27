import useTypedSelector from './useTypedSelector';

const useCumulativeCode = (cellId: string) => (
	useTypedSelector((state) => {
		const {data, order} = state.cells;
		const orderedCells = order?.map((id: string) => data[id]);
		// makes sure the show function's result displays within the executed
		// code cell and not in empty code cells.
		const show = `
				import _React from 'react';
				import _ReactDOM from 'react-dom';
				
				var show = (value) => {
					const root = document.getElementById('root');
				
					if (typeof value === 'object') {
						if (value.$$typeof && value.props) {
							_ReactDOM.render(value, root);
						} else {
							root.innerHTML = JSON.stringify(value);
						}		
					} else {
						root.innerHTML = value;				
					}
				}; 
			`;
		const showNoOp = `var show = () => {}`;
		const code = [];

		for (let c of orderedCells) {
			if (c.type === 'code') {
				if (c.id === cellId) {
					code.push(show);
				} else {
					code.push(showNoOp);
				}

				code.push(c.content);
			}

			if (c.id === cellId) {
				break;
			}
		}

		return code;
	}).join(`\n`)
);

export default useCumulativeCode;

