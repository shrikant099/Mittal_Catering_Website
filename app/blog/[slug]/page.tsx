import { dbConnect } from "@/lib/dbConnect";
import { Blog } from "@/models/blog/blog";
import StarterKit from "@tiptap/starter-kit";
import { generateHTML } from "@tiptap/html";
import { notFound } from "next/navigation";
import AnnouncementBar from "@/app/components/AnnouncementBar";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;

  await dbConnect();
  const blog = await Blog.findOne({ slug });

  if (!blog) return {};

  return {
    title: blog.metaTitle || blog.title,
    description: blog.metaDescription,
    keywords: blog.metaKeywords?.join(", "),
    openGraph: {
      title: blog.metaTitle || blog.title,
      description: blog.metaDescription,
      images: blog.image ? [blog.image] : [],
    },
  };
}

export default async function BlogPage({ params }: PageProps) {
  const { slug } = await params;

  await dbConnect();
  const blog = await Blog.findOne({ slug });

  if (!blog) return notFound();

  const html = generateHTML(blog.content, [StarterKit]);

  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <article className="max-w-4xl mx-auto px-6 py-14 text-white">
        <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>

        <p className="text-zinc-400 mb-8">{blog.metaDescription}</p>

        {blog.image && (
          <img
            src={blog.image}
            alt={blog.title}
            className="rounded-2xl mb-10"
          />
        )}

        <div
          className="
          prose prose-invert max-w-none
          prose-a:text-emerald-400
          prose-a:underline
          prose-a:cursor-pointer
        "
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </article>
      <Footer />
    </>
  );
}
