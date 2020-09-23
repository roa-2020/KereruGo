exports.seed = (knex) =>
// Deletes ALL existing entries
  knex("species")
    .del()
// Inserts seed entries
    .then(() => knex("species").insert([]));
