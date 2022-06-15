import Navbar from './navbar';
import Head from 'next/head';
import { GlobalStyle } from '../../styles/app.styles';
import { useRouter } from 'next/router';
import Footer from './footer';

const Layout = (props) => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>{`Next API template${router.asPath}`}</title>
        <meta name='description' content='next api template' />
        <meta name='author' content='Johann Ranudd' />
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Navbar />
      <GlobalStyle />
      <main>{props.children}</main>
      <Footer />
    </>
  );
};

export default Layout;
