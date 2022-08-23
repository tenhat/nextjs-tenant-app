import Link from "next/link";
import React, { useState } from "react";
import Layout from "../../../component/Layout";
import utilStyles from "../../styles/utilStyles.module.css";

function AddForm() {
  const [nameText, setNameText] = useState("");
  const onChangeNameText = (event: any) => setNameText(event.target.value);
  const myref: React.RefObject<any> = React.createRef();
  const [priceText, setPriceText] = useState("");
  const onChangePriceText = (event: any) => setPriceText(event.target.value);
  const [descText, setDescText] = useState("");
  const onChangeDescText = (event: any) => setDescText(event.target.value);

  const onClickAdd = () => {
    const result = myref.current.files.length ? `/images/${myref.current.files[0].name}` : "none";
    if(nameText && priceText && descText && myref) {
      return fetch("/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: nameText,
          price: priceText,
          description: descText,
          imageUrl: result,
          deleted: false
        })
      })
    } else {
      alert ('すべての項目を入力してください');
      return;
    }
  }

  return (
    <Layout>
      <form action="post">
        <label >name:</label>
        <br />
        <input type="text" name="name" id="name" value={nameText} onChange={onChangeNameText} />
        <br />
        <label className={utilStyles.labelButton}>
          参照
          <input type="file" ref={myref} className={utilStyles.none} />
        </label>
        <br />
        <label >description:</label>
        <br />
        <textarea name="description" id="description" cols={30} rows={10} value={descText} onChange={onChangeDescText}></textarea>
        <br />
        <label >price:</label>
        <br />
        <input type="text" name="price" id="price" value={priceText} onChange={onChangePriceText} />
        <br />
        {(nameText && priceText && descText && myref) && 
        <Link href="/">
          <button type="button" onClick={() => onClickAdd()}>追加</button>
        </Link>
        }
        <Link href="/">
          <button type="button">戻る</button>
        </Link>
      </form>
    </Layout>
  );
}

export default AddForm;
