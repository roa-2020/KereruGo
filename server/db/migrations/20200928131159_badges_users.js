
exports.up = function(knex) {
  return knex.schema.createTable('badges_users', table => {
      table.increments('id').primary
      table.integer('user_id')
      table.integer('badge_id')
      table.integer('current_count')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('badges_users')
};
