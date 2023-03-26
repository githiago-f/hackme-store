export const findAllProducts = ({ sortBy, order, perPage, page, product }) => `
  SELECT * FROM products
  WHERE 
    deletedAt is null
    AND product_name like("%${product??''}%")
  ORDER BY ${sortBy??'product_price'} ${order??'ASC'}
  LIMIT ${perPage??10}
  OFFSET ${(page??0) * (perPage??10)}
`;

export const countAllProducts = ({ product }) => `
SELECT count(product_id) as total
FROM products 
WHERE
  deletedAt is null
  AND product_name like("%${product??''}%")
`
