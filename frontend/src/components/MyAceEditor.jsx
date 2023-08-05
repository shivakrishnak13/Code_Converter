import React from 'react';
import AceEditor from 'react-ace';
import "ace-builds"
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/mode-php';
import 'ace-builds/src-noconflict/mode-c_cpp'; 
import 'ace-builds/src-noconflict/mode-csharp';
import 'ace-builds/src-noconflict/theme-monokai'; 

const MyAceEditor = ({code,onChange,language}) => {
    
  

    return (
      <AceEditor
        mode={language} 
        theme="monokai" 
        onChange={(e)=>onChange(e)} 
        name="editor"
        editorProps={{ $blockScrolling: true }} 
        fontSize={16} 
        height="1000px" // Set the editor height (optional)
        width="50%" // Set the editor width (optional)
        placeholder="Enter your code..."
      />
    );
  };

  export default MyAceEditor;
  