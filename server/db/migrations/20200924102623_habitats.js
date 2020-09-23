exports.up = knex => {
  return knex.schema.createTable('habitats', table => {
      table.increments('id').primary()
      table.string('habitat_name')
  })
};

exports.down = knex => {
  return knex.schema.dropTable('habitats')
};
