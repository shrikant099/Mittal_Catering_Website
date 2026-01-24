import StarterKit from "@tiptap/starter-kit";
import { generateHTML } from "@tiptap/html";

async function getBlogs() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/blogs`, {
    cache: "no-store",
  });

  const data = await res.json();
  return data.blogs;
}

export default async function BlogList() {
  const blogs = await getBlogs();

  return (
    <div className="space-y-6">
      {blogs.map((blog: any) => {
        const html = generateHTML(blog.content, [StarterKit]);

        return (
          <div
            key={blog._id}
            className="bg-zinc-900 border border-zinc-700 rounded-xl p-6"
          >
            <h2 className="text-2xl font-semibold mb-2">{blog.title}</h2>

            <p className="text-sm text-zinc-400 mb-4">Slug: {blog.slug}</p>

            {blog.image && (
              <img
                src={blog.image}
                alt={blog.title}
                className="rounded-lg mb-4 max-h-60 object-cover"
              />
            )}

            {/* CONTENT PREVIEW */}
            <div
              className="prose prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: html }}
            />

            {/* META INFO */}
            <div className="mt-4 text-sm text-zinc-400">
              <p>
                <b>Meta Title:</b> {blog.metaTitle}
              </p>
              <p>
                <b>Meta Description:</b> {blog.metaDescription}
              </p>
              <p>
                <b>Meta Keywords:</b> {blog.metaKeywords?.join(", ")}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
