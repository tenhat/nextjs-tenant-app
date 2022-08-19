import Head from 'next/head';
import Link from 'next/link';
import Items from '../../component/jsonItems';
import Layout from '../../component/Layout';
import styles from '../styles/Home.module.css';
import utilStyles from "../styles/utilStyles.module.css"


const Home = ({ allPostsData }: { allPostsData: { id: string; title: string; date: string; thumbnail: string }[] }) => {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <Layout>
        <Link href="/posts/addForm">
          <button>新規追加</button>
        </Link>
        <Items></Items>
      </Layout>
    </>
  );
};

export default Home;
