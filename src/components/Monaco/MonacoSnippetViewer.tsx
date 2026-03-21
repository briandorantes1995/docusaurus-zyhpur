
import React, { useEffect, useRef, useState } from "react";
import * as monaco from "monaco-editor";
import { Copy, Check } from "lucide-react";

export default function MonacoSnippetViewer({
  code = "",
  language = "javascript",
  theme = "vs-dark",
  height = "400px",
  fileName = "example.js",
  highlightLines = [], // [2,4,5]
}) {
  const editorRef = useRef(null);
  const monacoInstance = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!editorRef.current) return;

    monacoInstance.current = monaco.editor.create(editorRef.current, {
      value: code,
      language,
      theme,
      readOnly: true,
      minimap: { enabled: false },
      fontSize: 14,
      lineNumbers: "on",
      scrollBeyondLastLine: false,
      wordWrap: "on",
      automaticLayout: true,
      padding: { top: 12, bottom: 12 },
      occurrencesHighlight: "off",
    });

    return () => {
      monacoInstance.current?.dispose();
    };
  }, []);

  useEffect(() => {
    if (!monacoInstance.current) return;

    monacoInstance.current.setValue(code);
    const model = monacoInstance.current.getModel();
    if (model) {
      monaco.editor.setModelLanguage(model, language);
    }

    // Highlight lines
    const decorations = highlightLines.map((line) => ({
      range: new monaco.Range(line, 1, line, 1),
      options: {
        isWholeLine: true,
        className: "bg-yellow-500/10",
        glyphMarginClassName: "bg-yellow-500",
      },
    }));

    monacoInstance.current.deltaDecorations([], decorations);
  }, [code, language, highlightLines]);

  useEffect(() => {
    monaco.editor.setTheme(theme);
  }, [theme]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="w-full rounded-2xl overflow-hidden border border-gray-800 shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-900 border-b border-gray-800">
        <div className="text-sm text-gray-300 font-mono">
          {fileName}
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-2 text-xs text-gray-300 hover:text-white transition"
        >
          {copied ? (
            <>
              <Check size={16} /> Copied
            </>
          ) : (
            <>
              <Copy size={16} /> Copy
            </>
          )}
        </button>
      </div>

      {/* Editor */}
      <div
        ref={editorRef}
        style={{ height }}
      />
    </div>
  );
}

// Example usage:
// <MonacoSnippetViewer
//   fileName="utils.js"
//   code={`function sum(a, b) {\n  return a + b;\n}\n\nconsole.log(sum(2, 3));`}
//   language="javascript"
//   highlightLines={[2,5]}
// />
