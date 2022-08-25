import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = sanityClient({
   projectId: 'ty5yfbhe',
   dataset: 'production',
   apiVersion: '2022-08-23',
   useCdn: true,
   token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
});

export const builder = imageUrlBuilder(client);
export const urlFor  = (source) => builder.image(source);
