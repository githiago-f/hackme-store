export const findOrders = ({ email, product, page, perPage }) => `
  SELECT 
    o.*,
    user_email,
    user_name,
    product_name,
    product_price
  FROM orders o
  LEFT JOIN users u ON u.user_id = o.user_id
  LEFT JOIN products p ON p.product_id = o.product_id
  WHERE 
    u.user_email like("%${email??''}%")
    ${product ? `OR p.product_id = ${product}`: ''}
  LIMIT ${perPage??10}
  OFFSET ${(page??0) * (perPage??10)}
`;

export const countOrders = ({ email, product }) => `
  SELECT count(o.order_id) total
  FROM orders o
  LEFT JOIN users u ON u.user_id = o.user_id
  LEFT JOIN products p ON p.product_id = o.product_id
  WHERE 
    u.user_email like("%${email??''}%")
    ${product ? `OR p.product_id = ${product}`: ''}
`;

