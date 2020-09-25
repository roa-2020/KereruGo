exports.up = knex => {
  return knex.schema.createTable('birds_habitats', table => {
    table.integer('bird_id')
    table.integer('habitat_id')
  })
};

exports.down = knex => {
  return knex.schema.dropTable('birds_habitats')
};
