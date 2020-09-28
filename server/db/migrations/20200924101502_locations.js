
exports.up = function(knex) {
  return knex.schema.createTable('locations', table => {
      table.increments('id').primary()
      table.decimal('latitude', 10,8)
      table.decimal('longitude', 10,8)
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('locations')
};
