import { AiFillInstagram, AiOutlineTwitter } from 'react-icons/ai';

function Footer() {
   return (
      <div className="footer-container">
         <p>2022 Ayush's Productions. All Rights Reserved.</p>
         <p className="icons">
            <AiFillInstagram />
            <AiOutlineTwitter />
         </p>
      </div>
   );
}

export default Footer;