import {FunctionComponent} from 'react';

interface Props {
	onClick: () => void;
}

const AddButton: FunctionComponent<Props> = ({onClick, children}) => (
	<button
		className={`button is-rounded is-primary is-small`}
		onClick={onClick}
	>
		<span className={`icon is-small`}>
			<i className={`fas fa-plus`}/>
		</span>
		<span>
			{children}
		</span>
	</button>
);

export default AddButton;
