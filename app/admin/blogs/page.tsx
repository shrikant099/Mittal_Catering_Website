"use client";

import { useState } from "react";
import TextEditor from "./components/Text-editor";

export default function Page() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState<any>(null);

  // SEO states
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [metaKeywords, setMetaKeywords] = useState("");
  const [image, setImage] = useState("");

  const submitBlog = async () => {
    if (!title || !content) {
      alert("Title aur Content required hai");
      return;
    }

    const res = await fetch("/api/blogs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        content, // TipTap JSON
        metaTitle,
        metaDescription,
        metaKeywords, // comma separated string
        // image,
      }),
    });

    const data = await res.json();

    if (data.success) {
      alert("Blog Published Successfully 🚀");
    } else {
      alert("Something went wrong");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-8 text-white">
      <h1 className="text-3xl font-bold mb-8"> Create New Blog</h1>

      <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-6 space-y-6">
        {/* BLOG TITLE */}
        <input
          className="w-full p-4 rounded-lg bg-zinc-800 border border-zinc-700"
          placeholder="Blog Title (H1)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* TIPTAP EDITOR */}
        <TextEditor value={content} onChange={setContent} />

        {/* SEO */}
        <div className="grid md:grid-cols-2 gap-4">
          <input
            className="p-3 rounded-lg bg-zinc-800 border border-zinc-700"
            placeholder="Meta Title (SEO)"
            value={metaTitle}
            onChange={(e) => setMetaTitle(e.target.value)}
          />

          <input
            className="p-3 rounded-lg bg-zinc-800 border border-zinc-700"
            placeholder="Meta Keywords (comma separated)"
            value={metaKeywords}
            onChange={(e) => setMetaKeywords(e.target.value)}
          />
        </div>

        <textarea
          className="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-700"
          rows={3}
          placeholder="Meta Description (SEO)"
          value={metaDescription}
          onChange={(e) => setMetaDescription(e.target.value)}
        />

        {/* <input
          className="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-700"
          placeholder="Featured Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        /> */}
        
        {/* SUBMIT */}
        <div className="flex justify-end pt-4">
          <button
            onClick={submitBlog}
            className="bg-emerald-500 hover:bg-emerald-600 text-black font-semibold px-10 py-3 rounded-full shadow-lg transition"
          >
            🚀 Publish Blog
          </button>
        </div>
      </div>
    </div>
  );
}
