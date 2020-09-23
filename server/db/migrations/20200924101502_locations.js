
exports.up = function(knex) {
  return knex.schema.createTable('locations', table => {
      table.increments('id').primary()
      table.decimal('latitude')
      table.decimal('longitude')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('locations')
};
