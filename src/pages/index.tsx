import Head from 'next/head';
import Link from 'next/link';
import Items from '../../component/jsonItems';
import Layout from '../../component/Layout';
import { allPostsData } from '../../lib/posts';
import styles from '../styles/Home.module.css';
import utilStyles from "../styles/utilStyles.module.css"

export async function getStaticProps() {
  return {
    props: {
      allPostsData
    }
  }
}

const Home = ({allPostsData}: {allPostsData: {id: string; title: string; date: string; thumbnail: string}[]}) => {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <Layout>
        <Items></Items>

        {allPostsData.map((allPostData) => (
          <Link key={allPostData.id} href={`/posts/${allPostData.id}`}>
            <img className={utilStyles.imageLink} src={allPostData.thumbnail} />
          </Link>
        ))}
      </Layout>
    </>
  );
};

export default Home;
