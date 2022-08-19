import Link from "next/link";
import { useState } from "react";
import Layout from "../../../component/Layout";


function AddForm() {
  const [nameText, setNameText] = useState("");
  const onChangeNameText = (event: any) => setNameText(event.target.value);
  const [priceText, setPriceText] = useState("");
  const onChangePriceText = (event: any) => setPriceText(event.target.value);
  const [descText, setDescText] = useState("");
  const onChangeDescText = (event: any) => setDescText(event.target.value);

  const makeId = (max: number) => Math.floor(Math.random() * max)
  const onClickAdd = () => {
    return fetch("/items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: makeId(10000),
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
        <Link href="/">
          <button onClick={() => onClickAdd()}>追加</button>
        </Link>
        <Link href="/">
          <button>戻る</button>
        </Link>
      </form>
    </Layout>
  );
}

export default AddForm;
