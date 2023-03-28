/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function(knex) {
    return knex.schema.withSchema('mary_store')
        .createTable('products', t => {
            t.bigIncrements('product_id')
                .primary({constraintName:'product_pk'}).unsigned();
            t.string('product_name', 1000).notNullable();
            t.decimal('product_price', 2, 2).notNullable();
            t.timestamp('deletedAt').nullable();
            t.timestamps({ defaultToNow: true, useCamelCase: true });
        });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function(knex) {
    return knex.schema.withSchema('mary_store')
        .dropTable('products');
};
