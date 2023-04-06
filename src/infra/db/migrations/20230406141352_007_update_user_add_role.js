/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async function(knex) {
  return knex.schema.withSchema('mary_store')
    .table('users', t => {
      t.enum('role', ['admin', 'user']).notNullable().defaultTo('user');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function(knex) {
  return knex.schema.withSchema('mary_store').table('users', t => {
    t.dropColumn('role');
  });
};
