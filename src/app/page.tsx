import { client } from "@/libs/client";
import type { Blog, Tag } from "@/types/blog";
import Link from "next/link";

async function getData(): Promise<{ blogs: Blog[]; tags: Tag[] }> {
  const blog = await client.get({
    endpoint: "blog",
    customRequestInit: {
      // タグを設定
      next: { tags: ["articles"] },
    },
  });
  const tag = await client.get({
    endpoint: "tag",
    customRequestInit: {
      // タグを設定
      next: { tags: ["articles"] },
    },
  });

  // blog.contents.forEach((b: Blog) => {
  //   console.log(b.title)
  // });

  return {
    blogs: blog.contents,
    tags: tag.contents,
  };
}

export default async function Home() {
  const { blogs, tags } = await getData();

  // blogs.map((b) => {
  //   console.log(b.body);
  // });

  return (
    <div>
      <ul>
        {blogs.map((blog) => (
          <li key={blog.id}>
            <Link href={`/blog/${blog.id}`}>{blog.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
