import useSWR from 'swr';

export const fetcher: (args: string) => Promise<any> = (...args) => fetch(...args).then((res) => res.json());
const onClickDelete = (id: number) => {
  return fetch(`http://localhost:3000/items/${id}`, {
    method: "delete"
  }).then((res) => res.json)
}

export default function Items() {
  const { data, error } = useSWR('/items', fetcher);
  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <>
      {data.map((item: { id: number; name: string; description: string; price: number; imgUrl: string; deleted: boolean }) => {
        const { id, name, description } = item;
        return (
          <div key={id}>
            <h1>{name}</h1>
            <p>{description}</p>
            <button onClick={() => onClickDelete(id)}>削除</button>
          </div>
        )
      })}

    </>
  );
}
