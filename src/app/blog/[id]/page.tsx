import { client } from "@/libs/client";
import type { Blog } from "@/types/blog";
import { load } from "cheerio";
import hljs from "highlight.js";
import "highlight.js/styles/hybrid.css";

// URLパラメータの型を定義
// Next.jsの動的ルーティングでURLパスからパラメータを取得する際に、そのパラメータの型を明示的に定義する
type Params = {
  id: string;
};

// idに一致するブログの情報を取得
async function getData(id: string): Promise<Blog> {
  const data = await client.get({ endpoint: "blog", contentId: id });

  const $ = load(data.body);
  $("pre code").each((_, elm) => {
    const result = hljs.highlightAuto($(elm).text());
    $(elm).html(result.value);
    $(elm).addClass("hljs");
  });
  
  return {
    // dataオブジェクト内の全てのプロパティを新しいオブジェクトにコピーし、bodyプロパティの内容を上書き
    ...data,
    body: $.html(),
  };
};

// 動的ルーティングのために全てのパスを生成
export async function generateStaticParams(): Promise<Params[]> {
  const data = await client.get({ endpoint: "blog" });
  return data.contents.map((content: Blog) => ({
    id: content.id,
  }));
};

const BlogIdPage = async ({ params }: { params: Params }) => {
  // URLパラメータからidを取得し、getData関数の引数に渡して結果をblog変数に代入
  const blog = await getData(params.id);

  return (
    <main>
      <h1>{blog.title}</h1>
      <p>{blog.publishedAt}</p>
      <ul>
        {blog.tags.map((tag) => (
          <li key={tag.id}>#{tag.tag}</li>
        ))}
      </ul>
      <div
        // HTMLタグも文字列として取得されてしまうので、HTMLとして描画するため
        dangerouslySetInnerHTML={{
          __html: `${blog.body}`,
        }}
      />
    </main>
  );
};

export default BlogIdPage;
