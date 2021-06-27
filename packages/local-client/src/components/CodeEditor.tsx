import {FunctionComponent, useEffect, useRef} from 'react';
import MonacoEditor, {EditorDidMount} from '@monaco-editor/react';
import prettier from 'prettier';
import parser from 'prettier/parser-babel';
import {parse} from '@babel/parser';
// @ts-ignore
import Highlighter from 'monaco-jsx-highlighter';
import traverse from '@babel/traverse';
import './code-editor.css';

interface Props {
	initialValue: string;
	onChange: (value: string) => void;
}

const CodeEditor: FunctionComponent<Props> = ({initialValue, onChange}) => {
	const editorRef = useRef<any | null>();
	const highlighterRef = useRef<any | null>();
	const babelParse = (code: string) => parse(code, {
		sourceType: `module`,
		plugins: [`jsx`]
	});
	const onEditorDidMount: EditorDidMount = (getValue, editor) => {
		if (!editorRef.current) {
			editorRef.current = editor;
		}

		editor.onDidChangeModelContent(() => {
			onChange(getValue());
		});

		editor.getModel()?.updateOptions({ tabSize: 2});

		if (!highlighterRef.current) {
			highlighterRef.current = new Highlighter(
				// @ts-ignore
				window.monaco,
				babelParse,
				traverse,
				editor,
			);
		}
	}
	const onClickFormat = () => {
		if (!editorRef.current) {
			return;
		}

		const unformatted = editorRef.current.getModel().getValue();
		const formatted = prettier.format(unformatted, {
			parser: `babel`,
			plugins: [parser],
			useTabs: false,
			semi: true,
			singleQuote: true,
		}).replace(/\n/, ``);

		editorRef.current.setValue(formatted);
	};

	useEffect(() => {
		if (!highlighterRef.current) {
			return;
		}

		// gets rid of the library's console.log
		highlighterRef.current.highLightOnDidChangeModelContent(
			undefined,
			undefined,
			() => {},
			undefined,
			() => {}
		);
		highlighterRef.current.addJSXCommentCommand();
	}, []);


	return (
		<div className={`editor-wrapper`}>
			<button
				onClick={onClickFormat}
				className={`button button-format is-primary is-small`}
			>
				Format
			</button>
		<MonacoEditor
			value={initialValue}
			editorDidMount={onEditorDidMount}
			height={`100%`}
			theme={`dark`}
			language={`javascript`}
			options={{
				wordWrap: `on`,
				minimap: {
					enabled: false,
				},
				showUnused: false,
				folding: false,
				lineNumbersMinChars: 3,
				fontSize: 16,
				scrollBeyondLastLine: false,
				automaticLayout: true,
			}}
		/>
		</div>
	);
};

export default CodeEditor;
