import Link from "next/link";
import { dbConnect } from "@/lib/dbConnect";
import { Blog } from "@/models/blog/blog";
import StarterKit from "@tiptap/starter-kit";
import { generateHTML } from "@tiptap/html";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import AnnouncementBar from "../components/AnnouncementBar";

export default async function BlogsPage() {
  await dbConnect();
  const blogs = await Blog.find().sort({ createdAt: -1 });

  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <section className="max-w-7xl mx-auto px-6 py-12 text-white">
        <h1 className="text-4xl font-bold mb-10">📚 Our Blogs</h1>

        <div className="grid md:grid-cols-2 gap-8">
          {blogs.map((blog: any) => {
            const html = generateHTML(blog.content, [StarterKit]);

            return (
              <div
                key={blog._id}
                className="bg-gradient-to-br from-zinc-900 to-zinc-800
                         border border-zinc-700 rounded-2xl p-6
                         hover:shadow-xl hover:shadow-black/40
                         transition-all duration-300"
              >
                <Link href={`/blogs/${blog.slug}`}>
                  <h2 className="text-2xl font-semibold mb-2 text-emerald-400 hover:underline cursor-pointer">
                    {blog.title}
                  </h2>
                </Link>

                <p className="text-sm text-zinc-400 mb-4">
                  {blog.metaDescription}
                </p>

                {/* CONTENT PREVIEW */}
                <div
                  className="prose prose-invert max-w-none text-zinc-300 line-clamp-4"
                  dangerouslySetInnerHTML={{ __html: html }}
                />

                <div className="mt-6 flex justify-between items-center">
                  <Link
                    href={`/blog/${blog.slug}`}
                    className="text-emerald-400 hover:text-emerald-300 font-medium cursor-pointer"
                  >
                    Read More →
                  </Link>

                  <span className="text-xs text-zinc-500">
                    {new Date(blog.createdAt).toDateString()}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>
      <Footer />
    </>
  );
}
