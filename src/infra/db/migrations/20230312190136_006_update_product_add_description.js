/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function(knex) {
  return knex.schema.withSchema('mary_store')
    .table('products', t => {
      t.text('product_description').nullable();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function(knex) {
  return knex.schema.withSchema('mary_store').table('products', t => {
    t.dropColumn('product_description');
  });
};
