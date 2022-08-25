import createSchema from 'part:@sanity/base/schema-creator';
import schemaTypes from 'all:part:@sanity/base/schema-type';

// Schemas
import Product from './product';
import Banner from './banner';

export default createSchema({
   name: 'default',
   types: schemaTypes.concat([
      Product,
      Banner,
   ]),
});