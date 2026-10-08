import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { posts, getPost } from "@/lib/blog";
import { BlogPostPage, blogPostMetadata } from "@/components/pages/BlogPages";

export const dynamicParams = false;

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const post = getPost((await params).slug);
  return post ? blogPostMetadata(post) : {};
}

export default async function Page({ params }: { params: Params }) {
  const post = getPost((await params).slug);
  if (!post) notFound();
  return <BlogPostPage post={post} />;
}
