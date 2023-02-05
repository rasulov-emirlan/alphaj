import { type NextPage } from "next";
import Head from "next/head";

import { api } from "../utils/api";

import Words from "../modules/words";
import Header from "../components/Header";

const Home: NextPage = () => {
  const hello = api.words.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      <Head>
        <title>Alpha Japanese</title>
        <meta name="description" content="Learn Japanese Alphabet with ease" />
        <link rel="icon" href="/pokeball.png" />
      </Head>

      <Header />
      <Words />
    </>
  );
};

export default Home;
