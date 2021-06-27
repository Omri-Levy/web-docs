import {FunctionComponent} from 'react';

interface Props {
	onClick: () => void;
	icon: string;
}

const ActionButton: FunctionComponent<Props> = ({onClick, icon}) => (
	<button
		onClick={onClick}
		className={`button is-primary is-small`}
	>
				<span className={`icon`}>
					<i className={`fas fa-${icon}`}/>
				</span>
	</button>
);

export default ActionButton;
