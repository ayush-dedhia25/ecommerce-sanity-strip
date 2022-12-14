import { Toaster } from 'react-hot-toast';
import '../styles/globals.css';
import Layout from '../components/Layout';
import StateContextProvider from '../context/StateContext';

function MyApp({ Component, pageProps }) {
   return (
      <StateContextProvider>
         <Layout>
            <Toaster />
            <Component {...pageProps} />
         </Layout>
      </StateContextProvider>
   );
}

export default MyApp;