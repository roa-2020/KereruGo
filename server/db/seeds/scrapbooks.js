exports.seed = (knex) =>
// Deletes ALL existing entries
  knex("scrapbooks")
    .del()
// Inserts seed entries
    .then(() => knex("scrapbooks").insert([
      {user_id: 1, species_id: 1, date_spotted:new Date("24/09/2020")},
      {user_id: 1, species_id: 2, date_spotted:new Date("")},
    ]));
