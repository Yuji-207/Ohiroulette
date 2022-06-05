import Head from 'next/head';
import '../styles/globals.css';

const App = ({Component, pageProps}) => {
  return (
    <>
      <Head>
        <title>おひるーれっと</title>
        {/* <meta property="og:description" content="今日のお昼ごはんを決めよう！" /> */}
        <meta name="description" content="今日のお昼ごはんを決めよう！" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default App;
