
exports.up = function(knex) {
  return knex.schema.createTable('badges', table => {
    table.increments('id')
    table.string('badge_name')
    table.string('badge_tag')
    table.string('badge_bronze')
    table.string('badge_silver')
    table.string('badge_gold')
    table.integer('bronze_req')
    table.integer('silver_req')
    table.integer('gold_req')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('badges')
};
