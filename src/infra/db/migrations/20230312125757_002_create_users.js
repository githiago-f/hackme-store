/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function(knex) {
  return knex.schema.withSchema('mary_store')
      .createTable('users', t => {
          t.increments('user_id')
              .primary({constraintName: 'user_pk'}).unsigned();
          t.string('user_name', 255).notNullable();
          t.string('user_surname', 255).notNullable();
          t.string('user_email', 255).notNullable()
              .unique().index('user_email_index');
          t.string('user_password', 255).notNullable();
          t.timestamps({ defaultToNow: true, useCamelCase: true });
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function(knex) {
    return knex.schema.withSchema('mary_store').dropTable('users');
};
