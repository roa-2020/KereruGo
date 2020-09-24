
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('habitats').del()
    .then(function () {
      // Inserts seed entries
      return knex('habitats').insert([
        {id: 1, habitat_name: 'Coastal'},
        {id: 2, habitat_name: 'Inland Freshwater'},
        {id: 3, habitat_name: 'Forest'},
        {id: 4, habitat_name: 'Scrub'},
        {id: 5, habitat_name: 'Alpine'},
        {id: 6, habitat_name: 'River'}
      ]);
    });
};
