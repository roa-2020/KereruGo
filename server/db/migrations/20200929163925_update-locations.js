
exports.up = function(knex) {
  return knex.schema.table('locations', table => {
      table.integer('bird_density')
      table.integer('metres_rad')
  })
};

exports.down = function(knex) {
  return knex.schema.table('locations', table => {
    table.dropColumn('bird_density')
    table.dropColumn('metres_rad')
  })
};
