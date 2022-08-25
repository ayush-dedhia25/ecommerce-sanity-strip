import Head from 'next/head';
import Script from 'next/script';

import Navbar from './Navbar';
import Footer from './Footer';

function Layout({ children }) {
   return (
      <div className="layout">
         <Head>
            <title>Ayush Production's Store</title>
         </Head>
         <header>
            <Navbar />
         </header>
         <main className="main-container">
            { children }
         </main>
         <footer>
            <Footer />
         </footer>
         <Script
            src="https://cdn.jsdelivr.net/npm/eruda"
            onLoad={() => eruda.init()}
         />
      </div>
   );
}

export default Layout;