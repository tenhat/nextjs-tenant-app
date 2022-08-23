import Link from 'next/link';
import useSWR, { useSWRConfig } from 'swr';
import { Item } from 'types';
import jsonStyles from "./ItemList.module.css";

export const fetcher: (args: string) => Promise<any> = (...args) => fetch(...args).then((res) => res.json());

export default function Items() {
  const { data, error } = useSWR('/items', fetcher);
  const {mutate} = useSWRConfig()

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  const onClickDelete = (id: number) => {
    fetch(`http://localhost:8000/items/${id}`, {method: "delete"});
    mutate('/items');
  }
  
  return (
    <div className={jsonStyles.grid}>
      {data.map((item: Item) => {
        const { id, name, description, price } = item;
        return (
          <div key={id} className={jsonStyles.card}>
            <Link href={`posts/${id}`}>
              <a>
                <h1>{name}</h1>
              </a>
            </Link>
            <p>詳細：{description}</p>
            <p>価格：{price}円</p>
            <button onClick={() => onClickDelete(id)}>削除</button>
          </div>
        )
      })}

    </div>
  );
}
