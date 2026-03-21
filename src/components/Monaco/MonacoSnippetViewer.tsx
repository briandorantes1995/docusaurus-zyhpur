import React, { useEffect, useRef, useState } from "react";
import { Copy, Check } from "lucide-react";
import BrowserOnly from '@docusaurus/BrowserOnly';

function MonacoSnippetViewerImpl({
  code = "",
  language = "javascript",
  theme = "vs-dark",
  height = "400px",
  fileName = "example.js",
  highlightLines = [], // [2,4,5]
}: any) {
  const editorRef = useRef<HTMLDivElement>(null);
  const monacoInstance = useRef<any>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let monaco: any;
    let isMounted = true;

    if (!editorRef.current) return;

    import("monaco-editor").then((m) => {
      if (!isMounted) return;
      monaco = m;
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

      // Highlight lines immediately
      if (highlightLines.length > 0) {
        const decorations = highlightLines.map((line: number) => ({
          range: new monaco.Range(line, 1, line, 1),
          options: {
            isWholeLine: true,
            className: "bg-yellow-500/10",
            glyphMarginClassName: "bg-yellow-500",
          },
        }));
        monacoInstance.current.deltaDecorations([], decorations);
      }
    });

    return () => {
      isMounted = false;
      if (monacoInstance.current) {
        monacoInstance.current.dispose();
      }
    };
  }, []);

  useEffect(() => {
    if (!monacoInstance.current) return;
    
    import("monaco-editor").then((monaco) => {
      monacoInstance.current.setValue(code);
      const model = monacoInstance.current.getModel();
      if (model) {
        monaco.editor.setModelLanguage(model, language);
      }

      // Highlight lines
      const decorations = highlightLines.map((line: number) => ({
        range: new monaco.Range(line, 1, line, 1),
        options: {
          isWholeLine: true,
          className: "bg-yellow-500/10",
          glyphMarginClassName: "bg-yellow-500",
        },
      }));

      monacoInstance.current.deltaDecorations([], decorations);
    });
  }, [code, language, highlightLines]);

  useEffect(() => {
    import("monaco-editor").then((monaco) => {
      monaco.editor.setTheme(theme);
    });
  }, [theme]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="w-full rounded-2xl overflow-hidden border border-gray-800 shadow-lg" style={{ marginBottom: "1rem" }}>
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

export default function MonacoSnippetViewer(props: any) {
  return (
    <BrowserOnly fallback={<div style={{ height: props.height || '400px' }} className="w-full rounded-2xl bg-gray-900 border border-gray-800 animate-pulse" />}>
      {() => <MonacoSnippetViewerImpl {...props} />}
    </BrowserOnly>
  );
}

// Example usage:
// <MonacoSnippetViewer
//   fileName="utils.js"
//   code={`function sum(a, b) {\n  return a + b;\n}\n\nconsole.log(sum(2, 3));`}
//   language="javascript"
//   highlightLines={[2,5]}
// />
