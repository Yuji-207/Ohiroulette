import Head from 'next/head';
import '../styles/globals.css';

const App = ({Component, pageProps}) => {
  return (
    <>
      <Head>
        <title>おひるーれっと</title>
        <description>今日のお昼ごはんを決めよう！</description>
        <meta property="og:description" content=" ページの説明文" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default App;
