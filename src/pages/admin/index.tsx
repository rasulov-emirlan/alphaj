import { NextPage } from "next";
import Head from "next/head";
import Header from "../../components/Header";
import AdminComp from "../../modules/admin";

const Admin: NextPage = () => {
  return (
    <>
      <Head>
        <title>Alpha Japanese | Admin</title>
        <meta name="description" content="Learn Japanese Alphabet with ease" />
        <link rel="icon" href="/pokeball.png" />
      </Head>
      <Header />

      <AdminComp />
    </>
  );
};

export default Admin;
