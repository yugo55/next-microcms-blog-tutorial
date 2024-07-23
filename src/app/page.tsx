import { client } from "@/libs/client";
import type { Blog, Tag } from '@/types/blog';
import Link from "next/link";

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
    <div>
      <ul>
        {blogs.map((blog) => (
          <li key={blog.id}>
            <Link href={`/blog/${blog.id}`}>
              {blog.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
