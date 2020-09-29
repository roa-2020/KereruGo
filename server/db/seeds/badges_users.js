exports.seed = (knex) =>
// Deletes ALL existing entries
  knex("badges_users")
    .del()
// Inserts seed entries
    .then(() => knex("badges_users").insert([
     {id: 1}
    ]));
