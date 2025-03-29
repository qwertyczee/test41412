
import React, { useState, useEffect, useRef } from 'react';
import useSocket from '../hooks/useSocket';
import MonacoEditor from './MonacoEditor'; // Import MonacoEditor

const TerminalTab: React.FC = () => {
  const [input, setInput] = useState('');
  const [outputLines, setOutputLines] = useState<string[]>(['Welcome to the interactive terminal!']); // Renamed state
  const { isConnected, sendMessage, socket } = useSocket('/');
  const editorRef = useRef<any>(null); // Ref for editor instance

    // Effect to handle incoming terminal output
  useEffect(() => {
    if (socket) {
      const handleTerminalOutput = (payload: { output: string }) => {
        // Append output line by line if it contains newlines
        const lines = payload.output.split('\\n').filter(line => line.length > 0); // Corrected split character
        setOutputLines(prev => [...prev, ...lines]); // Use renamed state setter
      };

      socket.on('terminal_output', handleTerminalOutput);

      // Cleanup listener on component unmount or socket change
      return () => {
        socket.off('terminal_output', handleTerminalOutput);
      };
    }
  }, [socket]); // Dependency array remains the same

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleInputSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const command = input.trim();
      if (command) {
        setOutputLines(prev => [...prev, `> ${command}`]); // Update lines state
        // Send command to backend via socket
        if (isConnected) {
          sendMessage('terminal_command', { command });
        } else {
          setOutputLines(prev => [...prev, 'Error: Not connected to server.']); // Update lines state
        }
      }
      setInput('');
    }
  };

  // Effect to scroll editor to bottom when output changes
  useEffect(() => {
    if (editorRef.current) {
      // Monaco editor uses revealLineInCenterIfOutsideViewport or revealLine
      // Need to get the total number of lines
      const model = editorRef.current.getModel();
      if (model) {
        const lineCount = model.getLineCount();
        // Use revealLine to scroll to the last line
        editorRef.current.revealLine(lineCount, 1); // 1 = ScrollType.Immediate
        // Optionally, set cursor position if needed, though it's read-only
        // editorRef.current.setPosition({ lineNumber: lineCount, column: 1 });
      }
    }
  }, [outputLines]); // Depend on outputLines

  const handleEditorDidMount = (editor: any) => {
    editorRef.current = editor;
     // Ensure the editor scrolls to the bottom initially if there's content
     const model = editor.getModel();
      if (model) {
        const lineCount = model.getLineCount();
        editor.revealLine(lineCount, 1);
      }
  };

  return (
    <div className="h-full flex flex-col bg-gray-900"> {/* Use a slightly lighter bg */}
      {/* Monaco Editor for Output */}
      <div className="flex-grow overflow-hidden mb-1"> {/* Allow editor to take space */}
        <MonacoEditor
          language="plaintext" // Or 'shell' if appropriate, needs testing
          theme="vs-dark"
          value={outputLines.join('\\n')} // Join lines for editor value
          options={{
            readOnly: true,
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            fontSize: 13, // Slightly smaller font for terminal feel
            wordWrap: 'on',
            lineNumbers: 'off', // Hide line numbers for terminal feel
            glyphMargin: false,
            folding: false,
            lineDecorationsWidth: 0,
            lineNumbersMinChars: 0,
            renderLineHighlight: 'none', // Disable current line highlight
            cursorStyle: 'line', // Block cursor might be better if editable
            scrollbar: { // Customize scrollbar
              verticalScrollbarSize: 8,
              horizontalScrollbarSize: 8,
              alwaysConsumeMouseWheel: false, // Prevent editor from stealing scroll focus
            }
          }}
          onMount={handleEditorDidMount}
        />
      </div>
      {/* Input Area */}
      <div className="flex items-center p-2 border-t border-gray-700">
        <span className="mr-2 text-green-400 font-mono text-sm">></span>
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleInputSubmit}
          className="flex-grow bg-transparent border-none outline-none text-green-400 font-mono text-sm"
          placeholder="Enter command..."
        />
      </div>
      {/* Add buttons for clear, copy output, etc. here */}
      {/* Enhance UI for better terminal emulation (e.g., cursor blinking) here */}
    </div>
  );
};

export default TerminalTab;
