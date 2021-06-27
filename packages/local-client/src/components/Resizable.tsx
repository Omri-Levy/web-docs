import {FunctionComponent, useEffect, useState} from 'react';
import {ResizableBox, ResizableBoxProps} from 'react-resizable';
import './resizable.css';
import {ResizeDirection} from '../types';

interface Props {
	direction: ResizeDirection;
}

const Resizable: FunctionComponent<Props> = ({direction, children}) => {
	const [innerWidth, setInnerWidth] = useState(window.innerWidth);
	const [innerHeight, setInnerHeight] = useState(window.innerHeight);
	const [width, setWidth] = useState(window.innerWidth * 0.75);
	let resizableProps: ResizableBoxProps;

	// react-resizable only accepts numbers. Infinity equals to
	// 100%.
	if (direction === `horizontal`) {
		resizableProps = {
			width,
			height: Infinity,
			minConstraints: [innerWidth * 0.2, Infinity],
			maxConstraints: [innerWidth * 0.75, Infinity],
			resizeHandles: [`e`],
			className: `resize-horizontal`,
			onResizeStop: (event, data) => {
				setWidth(data.size.width);
			},
		};
	} else {
		resizableProps = {
			width: Infinity,
			height: 300,
			resizeHandles: [`s`],
			minConstraints: [Infinity, 24],
			maxConstraints: [Infinity, innerHeight * 0.9],
		};
	}

	useEffect(() => {
		let timer: NodeJS.Timeout;
		const listener = () => {
			if (timer) {
				clearTimeout(timer);
			}

			timer = setTimeout(() => {
				setInnerWidth(window.innerWidth);
				setInnerHeight(window.innerHeight);

				if (window.innerWidth * 0.75 < width) {
					setWidth(window.innerWidth * 0.75);
				}
			}, 100);
		};

		window.addEventListener(`resize`, listener);

		return () => {
			window.removeEventListener(`resize`, listener);
		};
	}, [width]);


	return (
		<ResizableBox {...resizableProps}>
			{children}
		</ResizableBox>
	);
};

export default Resizable;

