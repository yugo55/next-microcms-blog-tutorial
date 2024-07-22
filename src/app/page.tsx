import Link from "next/link";
import { client } from "@/libs/client";
import type { Blog, Tag } from '@/types/blog';

async function getData(): Promise<{ blogs: Blog[]; tags: Tag[] }> {
  const blog = await client.get({ endpoint: "blog" });
  const tag = await client.get({ endpoint: "tag" });

  return {
    blogs: blog.contents,
    tags: tag.contents,
  };
};

export default async function Home() {
  const { blogs, tags } = await getData();
  console.log(blogs);
  console.log(tags)

  return (
    <div>テスト</div>
  );
};
