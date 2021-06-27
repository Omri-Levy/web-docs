import MDEditor from '@uiw/react-md-editor';
import {FunctionComponent, useEffect, useRef, useState} from 'react';
import './text-editor.css';
import {Cell} from '../types';
import useActions from '../hooks/useActions';

interface Props {
	cell: Cell;
};

const TextEditor: FunctionComponent<Props> = ({cell}) => {
	const [editing, setEditing] = useState(false);
	const divRef = useRef<HTMLDivElement | null>(null);
	const {updateCell} = useActions();


	useEffect(() => {
		const onClickAway = (event: MouseEvent) => {
			// don't close the MDEditor if clicked inside of it
			if (
				divRef.current && event.target &&
				divRef.current.contains(event.target as Node)
			) {
				return;
			}

			setEditing(false);
		};

		document.addEventListener(`click`, onClickAway, {capture: true});

		return () => {
			document.removeEventListener(`click`, onClickAway, {capture: true});
		};
	}, []);


	if (editing) {
		return (
			<div ref={divRef} className={`text-editor`}>
				<MDEditor
					value={cell.content}
					onChange={(value) => updateCell(cell.id, value || ``)}
				/>
			</div>
		);
	}

	return (
		<div onClick={() => setEditing(true)} className={`text-editor card`}>
			<div className='card-content'>
				<MDEditor.Markdown source={cell.content || `Click to edit`}/>
			</div>
		</div>
	);
};

export default TextEditor;

