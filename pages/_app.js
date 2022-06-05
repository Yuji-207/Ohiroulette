import Head from 'next/head';
import '../styles/globals.css';

const App = ({Component, pageProps}) => {
  return (
    <>
      <Head>
        <title>おひるーれっと</title>
        {/* <meta property="og:url" content=" ページの URL" /> */}
        {/* <meta property="og:type" content=" ページの種類" /> */}
        <meta property="og:title" content=" ページの タイトル" />
        <meta property="og:description" content=" ページの説明文" />
        <meta property="og:site_name" content="サイト名" />
        {/* <meta property="og:image" content=" サムネイル画像の URL" /> */}
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default App;
