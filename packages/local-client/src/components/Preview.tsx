import {FunctionComponent, useEffect, useRef} from 'react';
import './preview.css';

interface Props {
	code: string;
	error: string;
}

const Preview: FunctionComponent<Props> = ({code, error}) => {
	const iframeRef = useRef<any>();

	const html = `
<html>
	<head>
	</head>
	<body>
		<div id='root'></div>
		<script>
		const handleError = (err) => {
			const root = document.getElementById('root');
					
			root.innerHTML = (
					'<div style="color: red;"><h4>Runtime Error</h4>' +
					 err + 
					 '</div>'
					 )
					 
					 console.error(err);
		};
			window.addEventListener('error', (event) => {
				event.preventDefault();
				
				handleError(event.error);
			});
		
			window.addEventListener('message', (event) => {
				try {
					eval(event.data);
				} catch (err) {
					handleError(err);
				}
			}, false);
		</script>
	</body>
</html>
`;

	useEffect(() => {
		iframeRef.current.srcdoc = html;

		setTimeout(() => {
			iframeRef.current.contentWindow.postMessage(code, `*`);
		}, 50);
	}, [code, html]);

	return (
		<div className={`preview-wrapper`}>
			<iframe
				title={`preview`}
				ref={iframeRef}
				sandbox={`allow-scripts`}
				srcDoc={html}
			/>
			{error && (
				<div className={`preview-error`}>
					<h4>Bundling Error</h4>
					{error}
				</div>
			)}
		</div>
	);
};

export default Preview;
