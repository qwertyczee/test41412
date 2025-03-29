
'use client';

import React from 'react';
import Editor, { EditorProps } from '@monaco-editor/react';

interface MonacoEditorProps extends EditorProps {
  // Add custom props if needed, e.g., specific themes, configurations
}

const MonacoEditor: React.FC<MonacoEditorProps> = ({
  language = 'plaintext', // Default language
  theme = 'vs-dark', // Default theme
  value = '',
  options = { // Default options
    minimap: { enabled: false },
    scrollBeyondLastLine: false,
    readOnly: false, // Default to editable, can be overridden by props
    fontSize: 14,
    wordWrap: 'on',
  },
  ...rest
}) => {
  // Implement loading state for the editor here
  // Add error handling for editor loading issues here
  // Consider integrating custom themes or configurations based on app settings here

  return (
    <Editor
      height="100%" // Default height, adjust as needed
      width="100%" // Default width
      language={language}
      theme={theme}
      value={value}
      options={options}
      {...rest}
      // Consider adding onMount or other handlers if needed
    />
  );
};

export default MonacoEditor;
