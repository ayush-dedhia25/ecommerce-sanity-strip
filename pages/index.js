import { HeroBanner, FooterBanner, Product } from '../components';
import { client } from '../lib/client';

function IndexPage({ products, bannerData }) {
   return (
      <>
         <HeroBanner heroBanner={bannerData.length && bannerData[0]} />
         <div className="products-heading">
            <h2>Best Selling Products</h2>
            <p>Speakers and Wireless of many variations.</p>
         </div>
         <div className="products-container">
            {products?.map((product) => <Product key={product._id} product={product} />)}
         </div>
         <FooterBanner footerBanner={bannerData.length && bannerData[0]} />
      </>
   );
}

export async function getServerSideProps() {
   // Fetch all Products
   const prodQuery = '*[_type == "product"]';
   const products = await client.fetch(prodQuery);
   // Fetch Banner Data
   const BannQuery = '*[_type == "banner"]';
   const bannerData = await client.fetch(BannQuery);
   
   return {
      props: { products, bannerData}
   };
}


export default IndexPage;