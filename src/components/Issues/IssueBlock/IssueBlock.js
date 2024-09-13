import React from 'react';
import MDEditor from '@uiw/react-md-editor';
import 'react-markdown-editor-lite/lib/index.css'; // Import styles for the markdown editor
import 'katex/dist/katex.css';


const IssueBlock = (edit_or_show) => {
    const [value, setValue] = React.useState('Insert issue report');
    return (<div data-color-mode={'light'}>
        {!edit_or_show ? (<MDEditor
            value={value}
            onChange={(val) => setValue(val)}
        />) : (<MDEditor.Markdown
            source={value}
        />)}
    </div>);
};

export default IssueBlock;
