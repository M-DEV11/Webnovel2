import React, { useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import "../styles/writing.css";
import { rewriteTextWithGemini } from "../services/gemini";

const Writing = () => {
  const [chapterName, setChapterName] = useState("");
  const [fontSize, setFontSize] = useState(16);

  const editor = useEditor({
    extensions: [StarterKit],
    content: "",
    editorProps: {
      attributes: {
        style: `font-size: ${fontSize}px;`,
      },
    },
  });

  const increaseFontSize = () => setFontSize(prev => prev + 2);
  const decreaseFontSize = () => setFontSize(prev => Math.max(10, prev - 2));

  const editWithAI = async () => {
  if (!editor) return;

  const currentText = editor.getText(); // Get raw plain text

  try {
    const rewrittenText = await rewriteTextWithGemini(currentText);
    editor.commands.setContent(`<p>${rewrittenText.replace(/\n/g, '</p><p>')}</p>`); // Replace editor content with HTML
  } catch (error) {
    console.error("AI Rewrite Error:", error);
    alert("Something went wrong while editing with AI.");
  }
};

  return (
    <div className="writing-wrapper">
      <h1 className="title">Write a New Chapter</h1>

      <input
        type="text"
        placeholder="Enter Chapter Name"
        className="chapter-input"
        value={chapterName}
        onChange={(e) => setChapterName(e.target.value)}
      />

      <div className="editor-toolbar">
        <button onClick={() => editor.chain().focus().toggleBold().run()} className={editor.isActive('bold') ? 'active' : ''}>Bold</button>
        <button onClick={() => editor.chain().focus().toggleItalic().run()} className={editor.isActive('italic') ? 'active' : ''}>Italic</button>
        <button onClick={() => editor.chain().focus().toggleUnderline().run()} className={editor.isActive('underline') ? 'active' : ''}>Underline</button>
        <button onClick={decreaseFontSize}>– Font</button>
        <button onClick={increaseFontSize}>+ Font</button>
        <button onClick={editWithAI}>Edit with AI</button>
      </div>

      <EditorContent editor={editor} className="editor" />
    </div>
  );
};

export default Writing;
