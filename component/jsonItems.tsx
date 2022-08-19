import Link from 'next/link';
import useSWR from 'swr';
import jsonStyles from "./jsonItems.module.css";

type Option = {
  // 識別子
  id: number;
  // オプションの名前
  name: string;
  // オプションの説明
  description: string;
  // オプションの価格
  price: number;
};

export type Item = {
  // 識別子
  id: number;
  // 商品名
  name: string;
  // 商品の説明
  description: string;
  // 商品の価格
  price: number;
  // 商品画像のURL
  imageUrl: string;
  // 削除フラグ
  deleted: boolean;
  // 商品に付随するオプション
  options: Option[];
};

export const fetcher: (args: string) => Promise<any> = (...args) => fetch(...args).then((res) => res.json());

export default function Items() {
  const { data, error } = useSWR('/items', fetcher, {refreshInterval: 1000});
  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  const onClickDelete = (id: number) => {
    return fetch(`http://localhost:8000/items/${id}`, {
      method: "delete"
    }).then((res) => res.json)
  }
  
  return (
    <div className={jsonStyles.grid}>
      {data.map((item: Item) => {
        const { id, name, description } = item;
        return (
          <div key={id} className={jsonStyles.card}>
            <Link href={`posts/${id}`}>
              <a>
                <h1>{name}</h1>
              </a>
            </Link>
            <p>{description}</p>
            <button onClick={() => onClickDelete(id)}>削除</button>
          </div>
        )
      })}

    </div>
  );
}
