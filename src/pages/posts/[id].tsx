import Title from "../../../component/jsonItems";
import Layout from "../../../component/Layout";
import {getPostData, paths} from "../../../lib/posts";

export async function getStaticPaths() {
  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({params}: {params: {id: string}}) {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    }
  }
}

export default function Json({postData}: {postData: {id: string; contentHTML: string; title: string; date: string}}) {
  return (
    <Layout>
      <h1>{postData.title}</h1>
      <small>{postData.date}</small>
      <p dangerouslySetInnerHTML={{__html: postData.contentHTML}} />
      <Title></Title>
    </Layout>
  );
}
