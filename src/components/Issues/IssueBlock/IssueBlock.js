import React from 'react';
import MDEditor from '@uiw/react-md-editor';
import 'react-markdown-editor-lite/lib/index.css'; // Import styles for the markdown editor
import 'katex/dist/katex.css';
import styles from './IssueBlock.css'


const IssueBlock = ({edit_or_show, content, setContent}) => {
    // const [value, setValue] = React.useState(content);
    // console.log(value);
    return (<div data-color-mode={'light'}>
        {!edit_or_show ? (<MDEditor
            value={content}
            onChange={(val) => setContent(val)}
        />) : (<MDEditor.Markdown
            source={content}
        />)}
    </div>);
};

export default IssueBlock;
