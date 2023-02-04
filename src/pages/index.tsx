import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

import { api } from "../utils/api";

import Words from "../modules/words";

const Home: NextPage = () => {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      <Head>
        <title>Alpha Japanese</title>
        <meta name="description" content="Learn Japanese Alphabet with ease" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Words />
    </>
  );
};

export default Home;
