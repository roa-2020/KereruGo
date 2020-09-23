exports.seed = (knex) =>
// Deletes ALL existing entries
  knex("scrapbooks")
    .del()
// Inserts seed entries
    .then(() => knex("scrapbooks").insert([]));
