import { useState } from 'react';
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { client, urlFor } from '../../lib/client';
import { Product } from '../../components';
import { useStateContext } from '../../context/StateContext';

function ProductDetails({ product, products }) {
   const [index, setIndex] = useState(0);
   const { qty, incQty, decQty, onAdd, setShowCart } = useStateContext();
   
   const handleBuyNow = () => {
      onAdd(product, qty);
      setShowCart(true);
   };
   
   return (
      <div>
         <div className="product-detail-container">
            <div>
               <div className="image-container">
                  <img src={urlFor(product?.image[index])} alt={product?.name} className="product-detail-image" />
               </div>
               <div className="small-images-container">
                  {product?.image.map((item, idx) => (
                     <img
                        key={idx}
                        src={urlFor(item)}
                        className={idx === index ? 'small-image selected-image' : 'small-image'}
                        onMouseEnter={() => setIndex(idx)}
                     />
                  ))}
               </div>
            </div>
            <div className="product-detail-desc">
               <h1>{product?.name}</h1>
               <div className="reviews">
                  <div>
                     <AiFillStar />
                     <AiFillStar />
                     <AiFillStar />
                     <AiFillStar />
                     <AiOutlineStar />
                  </div>
                  <p>{20}</p>
               </div>
               <h4>Details: </h4>
               <p>{product?.details}</p>
               <p className="price">$ {product?.price}</p>
               <div className="quantity">
                  <h3>Quantity: </h3>
                  <p className="quantity-desc">
                     <span className="minus" onClick={decQty}><AiOutlineMinus /></span>
                     <span className="num">{qty}</span>
                     <span className="plus" onClick={incQty}><AiOutlinePlus /></span>
                  </p>
               </div>
               <div className="buttons">
                  <button type="button" className="add-to-cart" onClick={() => onAdd(product, qty)}>Add to Cart</button>
                  <button type="button" className="buy-now" onClick={handleBuyNow}>Buy Now</button>
               </div>
            </div>
         </div>
         <div className="maylike-products-wrapper">
         <h3>You may also like</h3>
            <div className="marquee">
               <div className="maylike-products-container track">
                  {products?.map((prod) => <Product key={prod._id} product={prod} />)}
               </div>
            </div>
         </div>
      </div>
   );
}

export async function getStaticPaths() {
   const query = `*[_type == "product"] { slug { current } }`;
   const products = await client.fetch(query);
   const paths = products.map((product) => ({
      params: {
         slug: product.slug.current,
      }
   }));
   return { paths, fallback: 'blocking' };
}

export async function getStaticProps({ params }) {
   const query = `*[_type == "product" && slug.current == '${params.slug}'][0]`;
   const productsQuery = '*[_type == "product"]';
   const product = await client.fetch(query);
   const products = await client.fetch(productsQuery);
   return {
      props: { product, products }
   };
}

export default ProductDetails;