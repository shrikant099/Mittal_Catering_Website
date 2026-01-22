"use client";

import { EditorContent, useEditor, useEditorState } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import type { Editor } from "@tiptap/react";

function Toolbar({ editor }: { editor: Editor }) {
  const state = useEditorState({
    editor,
    selector: (ctx) => ({
      bold: ctx.editor.isActive("bold"),
      italic: ctx.editor.isActive("italic"),
      underline: ctx.editor.isActive("underline"),
      link: ctx.editor.isActive("link"),
      quote: ctx.editor.isActive("blockquote"),
    }),
  });

  const btn = (active?: boolean) =>
    `px-3 py-1.5 rounded-md text-sm font-medium transition
     ${
       active
         ? "bg-emerald-500 text-black"
         : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
     }`;

  const addLink = () => {
    const url = prompt("Enter link URL");
    if (!url) return;
    editor.chain().focus().setLink({ href: url }).run();
  };

  return (
    <div className="flex flex-wrap gap-2 p-3 border-b border-zinc-700 bg-zinc-900">
      <button
        className={btn(state.bold)}
        onClick={() => editor.chain().focus().toggleBold().run()}
      >
        B
      </button>
      <button
        className={btn(state.italic)}
        onClick={() => editor.chain().focus().toggleItalic().run()}
      >
        I
      </button>
      <button
        className={btn(state.underline)}
        onClick={() => editor.chain().focus().toggleUnderline().run()}
      >
        U
      </button>

      <button
        className={btn()}
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
      >
        H1
      </button>
      <button
        className={btn()}
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
      >
        H2
      </button>
      <button
        className={btn()}
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
      >
        H3
      </button>

      <button
        className={btn()}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      >
        • List
      </button>
      <button
        className={btn()}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
      >
        1. List
      </button>

      <button
        className={btn(state.quote)}
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
      >
        ❝ Quote
      </button>
      <button
        className={btn()}
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
      >
        {"</>"}
      </button>

      <button className={btn(state.link)} onClick={addLink}>
        🔗 Link
      </button>

      <button
        className={btn()}
        onClick={() => editor.chain().focus().undo().run()}
      >
        Undo
      </button>
      <button
        className={btn()}
        onClick={() => editor.chain().focus().redo().run()}
      >
        Redo
      </button>
    </div>
  );
}

export default function TextEditor({ value, onChange }: any) {
  const editor = useEditor({
    extensions: [StarterKit, Underline, Link.configure({ openOnClick: false })],
    content: value,
    immediatelyRender: false,
    onUpdate({ editor }) {
      onChange(editor.getJSON());
    },
    editorProps: {
      attributes: {
        class:
          "min-h-[260px] p-4 prose prose-invert max-w-none focus:outline-none",
      },
    },
  });

  if (!editor) return null;

  return (
    <div className="rounded-xl border border-zinc-700 overflow-hidden bg-zinc-900">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
