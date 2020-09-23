
exports.up = function(knex) {
  return knex.schema.createTable('scrapbooks', table =>{
      table.integer("user_id")
      table.integer("bird_id")
      table.timestamp('date_spotted').defaultTo(knex.fn.now())
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('scrapbooks')
};
