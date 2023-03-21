/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function(knex) {
  return knex.schema.withSchema('mary_store')
    .createTable('orders', t => {
      const status = ['paid', 'canceled', 'waiting', 'confirmed'];
      t.bigIncrements('order_id').unsigned().primary({ constraintName: 'orders_pk' });
      t.enum('order_status', status).defaultTo('waiting');
      t.enum('payment_method', ['card', 'pix', 'boleto']);
      t.integer('card_used').unsigned().nullable();
      t.bigInteger('product_id').unsigned().notNullable();
      t.integer('user_id').unsigned().notNullable();
      t.timestamps({ defaultToNow: true, useCamelCase: true });

      t.foreign('card_used').references('card_id').inTable('card_data');
      t.foreign('product_id', 'order_product_id')
        .references('product_id')
        .inTable('mary_store.products');
      t.foreign('user_id')
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
  return knex.schema.withSchema('mary_store').dropTable('orders');
};
