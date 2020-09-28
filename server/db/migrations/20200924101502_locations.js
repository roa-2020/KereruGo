
exports.up = function(knex) {
  return knex.schema.createTable('locations', table => {
      table.increments('id').primary()
      table.decimal('latitude', 8, 10)
      table.decimal('longitude', 8, 10)
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('locations')
};
