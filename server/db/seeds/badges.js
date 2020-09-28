exports.seed = (knex) =>
// Deletes ALL existing entries
  knex("badges")
    .del()
// Inserts seed entries
    .then(() => knex("badges").insert([
      {id: 1, badge_name: "Total Birds", badge_tag: "Total birds found so far", badge_bronze: "/images/mystery-bird.png", badge_silver:"/images/whio.png", badge_gold:"/images/tui.png", bronze_req: 10, silver_req: 20, gold_req: 50 },
      ]));