/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function(knex) {
  return knex.schema.withSchema('mary_store')
    .table('products', t => {
      t.decimal('product_price', 10, 2)
        .alter({alterType: true, alterNullable:false});
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function(knex) {
  return knex.schema.table('products', t => {
    t.decimal('product_price', 2, 2)
      .alter({alterType: true, alterNullable:false});
  });
};
