exports.seed = (knex) =>
// Deletes ALL existing entries
  knex("locations")
    .del()
// Inserts seed entries
    .then(() => knex("locations").insert([

      //COASTAL
      {latitude: -41.287201, longitude: 174.779317, bird_density: 12, metres_rad: 500},
      {latitude: -41.290510, longitude: 174.783867, bird_density: 12, metres_rad: 500},
      {latitude: -41.291122, longitude: 174.794124},
      {latitude: -41.291541, longitude: 174.803823},
      {latitude: -41.293703, longitude: 174.822347},
      {latitude: -41.296843, longitude: 174.833585},
      {latitude: -41.302534, longitude: 174.831119},
      {latitude: -41.322067, longitude: 174.834515},
      {latitude: -41.331332, longitude: 174.830330},
      {latitude: -41.344210, longitude: 174.820702},
      {latitude: -41.341738, longitude: 174.809948},
      {latitude: -41.330750, longitude: 174.793898},
      {latitude: -41.341995, longitude: 174.784972},
      {latitude: -41.344476, longitude: 174.770853},
      {latitude: -41.348413, longitude: 174.765507},
      {latitude: -41.346197, longitude: 174.756091},

      //FOREST
      {latitude: -41.295969, longitude: 174.794316},
      {latitude: -41.293766, longitude: 174.790825},
      {latitude: -41.296561, longitude: 174.790494},
      {latitude: -41.298799, longitude: 174.791590},
      {latitude: -41.298444, longitude: 174.768400},
      {latitude: -41.297968, longitude: 174.766373},
      {latitude: -41.293838, longitude: 174.761238},
      {latitude: -41.295262, longitude: 174.768340},
      {latitude: -41.291122, longitude: 174.794124},
      {latitude: -41.291541, longitude: 174.803823},
      {latitude: -41.293703, longitude: 174.822347},
      {latitude: -41.296843, longitude: 174.833585},
      {latitude: -41.302534, longitude: 174.831119},
      {latitude: -41.322067, longitude: 174.834515},
      {latitude: -41.331332, longitude: 174.830330},
      {latitude: -41.344210, longitude: 174.820702},
      {latitude: -41.341738, longitude: 174.809948},
      {latitude: -41.330750, longitude: 174.793898},
      {latitude: -41.341995, longitude: 174.784972},
      {latitude: -41.344476, longitude: 174.770853},
      {latitude: -41.348413, longitude: 174.765507},
      {latitude: -41.346197, longitude: 174.756091},
      {latitude: -41.284192, longitude: 174.767345},
      {latitude: -41.290357, longitude: 174.753291},

       //CITY OR MISC
    
      //  {latitude: -41.296926, longitude: 174.774268},
      //  {latitude: -41.293385, longitude: 174.774941},
      //  {latitude: -41.295630, longitude: 174.770862},

       //PORIRUA

       {latitude: -41.127554, longitude: 174.850574},
       {latitude: -41.127542, longitude: 174.850873},
       {latitude: -41.127777, longitude: 174.850673},
       {latitude: -41.124762, longitude: 174.852905},

      //ZEALANDIA
      {latitude: -41.291691, longitude: 174.748956},
      {latitude: -41.294721, longitude: 174.748063},
      {latitude: -41.293283, longitude: 174.752171},
      {latitude: -41.299724, longitude: 174.747451},
      {latitude: -41.298919, longitude: 174.739872},

      // MAKARA MOUNTAIN BIKE PARK
      {latitude: -41.293428, longitude: 174.709614},
      {latitude: -41.293033, longitude: 174.717651},

      // TINAKORI HILL
      {latitude: -41.272846, longitude: 174.768477, bird_density: 10, metres_rad: 400},
      {latitude: -41.268074, longitude: 174.770277, bird_density: 10, metres_rad: 400},
    ]));
