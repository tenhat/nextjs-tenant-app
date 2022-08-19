import Link from "next/link";
import { useState } from "react";
import Layout from "../../../component/Layout";

function Edit() {
  const [idText, setIdText] = useState("");
  const onChangeIdText = (event: any) => setIdText(event.target.value);
  const [nameText, setNameText] = useState("");
  const onChangeNameText = (event: any) => setNameText(event.target.value);
  const [priceText, setPriceText] = useState("");
  const onChangePriceText = (event: any) => setPriceText(event.target.value);
  const [descText, setDescText] = useState("");
  const onChangeDescText = (event: any) => setDescText(event.target.value);

  const onClickEdit = () => {
    return fetch(`http://localhost:8000/items/${idText}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: nameText,
        price: priceText,
        description: descText,
        imageUrl: "/images/thumbnail01.jpg",
        deleted: false
      })
    })
  }

  return (
    <Layout>
      <form action="post">
        <label >id:</label>
        <br />
        <input type="text" name="id" id="id" value={idText} onChange={onChangeIdText} />
        <br />
        <label >name:</label>
        <br />
        <input type="text" name="name" id="name" value={nameText} onChange={onChangeNameText} />
        <br />
        <label >description:</label>
        <br />
        <textarea name="description" id="description" cols={30} rows={10} value={descText} onChange={onChangeDescText}></textarea>
        <br />
        <label >price:</label>
        <br />
        <input type="text" name="price" id="price" value={priceText} onChange={onChangePriceText} />
        <br />
        <Link href={`http://localhost:3000/posts/${idText}`}>
          <button onClick={() => onClickEdit()}>編集</button>
        </Link>
        <Link href="/">
          <button>戻る</button>
        </Link>
      </form>
    </Layout>
  );
}

export default Edit;
