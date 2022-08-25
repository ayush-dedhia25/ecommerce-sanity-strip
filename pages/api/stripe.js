import Stripe from 'stripe';

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

async function handler(req, res) {
   if (req.method === 'POST') {
      try {
         const lineItems = req.body.map((item) => {
            const img = item.image[0].asset._ref;
            const newImage = img.replace('image-', 'https://cdn.sanity.io/images/ty5yfbhe/production/').replace('-webp', '.webp');
            return {
               price_data: {
                  currency: 'inr',
                  product_data: {
                     name: item.name,
                     images: [newImage],
                  },
                  unit_amount: item.price * 100,
               },
               adjustable_quantity: {
                  enabled: true,
                  minimum: 1,
               },
               quantity: item.quantity,
            };
         });
         
         const params = {
            line_items: lineItems,
            shipping_options: [
               { shipping_rate: 'shr_1LaHSRSF0e8Fxhpz8dbs0Rmr' },
               { shipping_rate: 'shr_1LaHVjSF0e8FxhpzfzLk65Yn' },
            ],
            mode: 'payment',
            submit_type: 'pay',
            payment_method_types: ['card'],
            billing_address_collection: 'auto',
            success_url: `${req.headers.origin}/success?success=true`,
            cancel_url: `${req.headers.origin}/?canceled=true`,
         };
         
         const session = await stripe.checkout.sessions.create(params);
         res.status(200).json(session);
      } catch (err) {
         res.status(err.statusCode || 500).json({ error: err.message });
      }
   } else {
      res.setHeader('ALLOW', 'POST');
      res.status(405).end('METHOD NOT ALLOWED');
   }
}

export default handler;