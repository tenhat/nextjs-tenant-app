import Link from "next/link";
import useSWR from "swr";
import { Item } from "../../../component/jsonItems";
import Layout from "../../../component/Layout";
import { getAllJsonIds, getJsonData } from "../../../lib/json";

export async function getStaticPaths() {
  const paths = await getAllJsonIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: { params: { id: number } }) {
  const jsonData = await getJsonData(params.id);
  return {
    props: {
      jsonData
    },
  }
}

export const fetcher: (args: string) => Promise<any> = (...args) => fetch(...args).then((res) => res.json());


export default function Details({ jsonData }: { jsonData: Item }) {
  const { id, name, description, imageUrl, price } = jsonData;
  const { data, error } = useSWR('/items', fetcher, {refreshInterval: 1000});
  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <Layout>
      <h1>名前：{name}</h1>
      <h1>id：{id}</h1>
      <img src={imageUrl} />
      <p>詳細：{description}</p>
      <p>価格：{price}円</p>
      <Link href={{pathname: "/posts/edit", query: {id: id.toString()}}} >
        <button>編集</button>
      </Link>
      <Link href="/">
        <button>戻る</button>
      </Link>
    </Layout>
  );
}
