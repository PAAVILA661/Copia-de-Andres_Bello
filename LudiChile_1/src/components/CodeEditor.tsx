"use client";

import React, { useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python';
import { oneDark } from '@codemirror/theme-one-dark';
import { Button } from '@/components/ui/button';
import { Play, Square, Copy, Save, RotateCcw } from 'lucide-react';

interface CodeEditorProps {
  initialCode: string;
  onChange: (value: string) => void;
  onRun: () => void;
  isRunning: boolean;
  output: string;
  onReset?: () => void;
  onSave?: () => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  initialCode,
  onChange,
  onRun,
  isRunning,
  output,
  onReset,
  onSave,
}) => {
  const handleCopyCode = () => {
    navigator.clipboard.writeText(initialCode);
  };

  const editorExtensions = [python()];

  return (
    <div className="flex flex-col h-full">
      {/* Barra superior del editor */}
      <div className="bg-codedex-darkNavy px-4 py-2 border-b border-gray-800 flex items-center justify-between">
        <div className="bg-codedex-navy text-white px-3 py-1.5 text-sm rounded-t-md font-mono">
          script.py
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          className="text-gray-400 hover:text-white"
          onClick={onReset}
          title="Reiniciar código"
        >
          <RotateCcw size={14} />
        </Button>
      </div>

      {/* Editor de código */}
      <div className="flex-grow overflow-auto">
        <CodeMirror
          value={initialCode}
          height="100%"
          extensions={editorExtensions}
          onChange={onChange}
          theme={oneDark}
          basicSetup={{
            lineNumbers: true,
            highlightActiveLineGutter: true,
            highlightSpecialChars: true,
            foldGutter: true,
            drawSelection: true,
            dropCursor: true,
            allowMultipleSelections: true,
            indentOnInput: true,
            syntaxHighlighting: true,
            bracketMatching: true,
            closeBrackets: true,
            autocompletion: true,
            rectangularSelection: true,
            crosshairCursor: true,
            highlightActiveLine: true,
            highlightSelectionMatches: true,
            closeBracketsKeymap: true,
            defaultKeymap: true,
            searchKeymap: true,
            historyKeymap: true,
            foldKeymap: true,
            completionKeymap: true,
            lintKeymap: true,
          }}
          className="h-full"
        />
      </div>

      {/* Acciones del editor */}
      <div className="px-4 py-2 border-t border-gray-800 flex items-center justify-between">
        <div className="flex gap-2">
          <Button
            onClick={onRun}
            className="bg-codedex-teal text-white hover:bg-codedex-teal/80 flex items-center gap-1"
            disabled={isRunning}
          >
            {isRunning ? <Square size={16} /> : <Play size={16} />}
            {isRunning ? 'Detener' : 'Ejecutar'}
          </Button>

          <Button 
            variant="outline" 
            className="border-gray-700 text-gray-300"
            onClick={handleCopyCode}
            title="Copiar código"
          >
            <Copy size={16} />
          </Button>

          <Button 
            variant="outline" 
            className="border-gray-700 text-gray-300"
            onClick={onSave}
            title="Guardar código"
          >
            <Save size={16} />
          </Button>
        </div>
      </div>

      {/* Terminal */}
      <div className="h-40 bg-black p-4 font-mono text-sm text-gray-300 overflow-auto">
        <div className="text-gray-500 mb-2">Terminal</div>
        <div className="whitespace-pre-line">{output}</div>
      </div>
    </div>
  );
};

export default CodeEditor; 