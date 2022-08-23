import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Layout from "../../../component/Layout";
import utilStyles from "../../styles/utilStyles.module.css";

function Edit() {
  const router = useRouter();
  const [idText, setIdText] = useState(router.query.id);
  const onChangeIdText = (event: React.FormEvent<HTMLInputElement>): void => setIdText(event.currentTarget.value);
  const onClickReload = () => {
    return fetch(`http://localhost:8000/items/${idText}`, {
      method: "GET",
    }).then(res => res.json()).then(data => {
      setNameText(data.name);
      setDescText(data.description);
      setPriceText(data.price);
      setImageText(data.imageUrl);
    })
  }
  const [nameText, setNameText] = useState("");
  const onChangeNameText = (event: React.FormEvent<HTMLInputElement>): void => setNameText(event.currentTarget.value);
  const myref: any = React.createRef();
  const [imageText, setImageText] = useState("");
  const [priceText, setPriceText] = useState("");
  const onChangePriceText = (event: React.FormEvent<HTMLInputElement>): void => setPriceText(event.currentTarget.value);
  const [descText, setDescText] = useState("");
  const onChangeDescText = (event: React.FormEvent<HTMLTextAreaElement>): void => setDescText(event.currentTarget.value);

  const onClickEdit = () => {
    const result = myref.current.files.length ? `/images/${myref.current.files[0].name}` : imageText;
    if(nameText && priceText && descText) {
      return fetch(`http://localhost:8000/items/${idText}`, {
        method: "PUT",
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
      alert("すべての項目を入力してください");
      return;
    }
  }

  // const onClickConsole = () => {
  //   console.log(myref);
  //   console.log(imageText);
  //   // console.log(result);
  //   console.log(myref.current.files.length);
  // };

  return (
    <Layout>
      <form action="post">
        <label >id:</label>
        <br />
        <input type="text" name="id" id="id" value={idText} onChange={onChangeIdText} />
        <button type="button" onClick={() => onClickReload()}>引き継ぎ</button>
        <br />
        <label >name:</label>
        <br />
        <input type="text" name="name" id="name" value={nameText} onChange={onChangeNameText} />
        <br />
        <label >Image:</label>
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
          <button type="button" onClick={() => onClickEdit()}>追加</button>
        </Link>
        }
        <Link href="/">
          <button>戻る</button>
        </Link>
        {/* <button type="button" onClick={() => onClickConsole()}>console.log</button> */}
      </form>
    </Layout>
  );
}

export default Edit;
