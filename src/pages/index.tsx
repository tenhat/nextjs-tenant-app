import Head from 'next/head';
import Link from 'next/link';
import Items from '../../component/jsonItems';
import Layout from '../../component/Layout';
import styles from '../styles/Home.module.css';
import utilStyles from "../styles/utilStyles.module.css"


const Home = () => {
  return (
    <>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
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
