import {FunctionComponent, useEffect} from 'react';
import CodeEditor from './CodeEditor';
import Preview from './Preview';
import Resizable from './Resizable';
import {Cell} from '../types';
import useActions from '../hooks/useActions';
import useTypedSelector from '../hooks/useTypedSelector';
import './code-cell.css';
import useCumulativeCode from '../hooks/useCumulativeCode';

interface Props {
	cell: Cell;
}

const CodeCell: FunctionComponent<Props> = ({cell}) => {
	const {updateCell, createBundle} = useActions();
	const bundle = useTypedSelector((state) => state.bundles[cell.id]);
	const cumulativeCode = useCumulativeCode(cell.id);

	useEffect(() => {
		if (!bundle) {
			createBundle(cell.id, cumulativeCode);

			return;
		}

		const timer = setTimeout(async () => {
			createBundle(cell.id, cumulativeCode);
		}, 1000);

		return () => {
			clearTimeout(timer);
		};

		// adding bundle to the dependency array causes infinite re-renders
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [cumulativeCode, cell.id, createBundle]);


	return (
		<Resizable direction={`vertical`}>
			<div
				style={{
					height: `calc(100% - 10px)`,
					display: `flex`,
					flexDirection: `row`,
				}}>
				<Resizable direction={`horizontal`}>
					<CodeEditor
						initialValue={cell.content}
						onChange={(value) => updateCell(cell.id, value)}
					/>
				</Resizable>
				<div className={`progress-cover-wrapper`}>
					{!bundle || bundle.loading
						? <div className={`progress-cover`}>
							<progress
								className={`progress is-small is-primary`}
								max={`100`}
							>
								Loading...
							</progress>
						</div>
						: <Preview code={bundle.code} error={bundle.error}/>
					}
				</div>
			</div>
		</Resizable>
	);
};

export default CodeCell;

