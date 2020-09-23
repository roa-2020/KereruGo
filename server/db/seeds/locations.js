exports.seed = (knex) =>
// Deletes ALL existing entries
  knex("locations")
    .del()
// Inserts seed entries
    .then(() => knex("locations").insert([
      {id:1, latitude: -41.296926, longitude: 174.774268},
      {id:2, latitude: -41.297769, longitude: 174.773163},
      {id:3, latitude: -41.296201, longitude: 174.774314}
    ]));
