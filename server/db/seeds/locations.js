exports.seed = (knex) =>
// Deletes ALL existing entries
  knex("locations")
    .del()
// Inserts seed entries
    .then(() => knex("locations").insert([]));
