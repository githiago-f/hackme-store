/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function(knex) {
  return knex.schema.withSchema('mary_store')
    .createTable('card_data', t => {
      t.increments('card_id').primary({ constraintName: 'card_id' }).unsigned();
      t.enum('card_flag', ['visa', 'mastercard', 'discover', 'cielo', 'amex']);
      t.string('card_number', 16)
        .unique()
        .index('card_number_idx')
        .notNullable();
      t.string('card_cvv').notNullable();
      t.string('card_holder', 255).notNullable();
      t.string('card_expiration_date').notNullable();
      t.timestamp('deletedAt').nullable();
      t.integer('user_id').unsigned().notNullable();
      t.timestamps({ defaultToNow: true, useCamelCase: true });

      t.foreign('user_id', 'card_user_id')
        .references('user_id')
        .inTable('mary_store.users')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function(knex) {
  return knex.schema.withSchema('mary_store').dropTable('card_data');
};
