exports.seed = (knex) =>
// Deletes ALL existing entries
  knex("locations")
    .del()
// Inserts seed entries
    .then(() => knex("locations").insert([

      //COASTAL
      {id:5, latitude: -41.287201, longitude: 174.779317},
      {id:6, latitude: -41.290510, longitude: 174.783867},
      {id:7, latitude: -41.291122, longitude: 174.794124},
      {id:8, latitude: -41.291541, longitude: 174.803823},
      {id:9, latitude: -41.293703, longitude: 174.822347},
      {id:10, latitude: -41.296843, longitude: 174.833585},
      {id:11, latitude: -41.302534, longitude: 174.831119},
      {id:12, latitude: -41.322067, longitude: 174.834515},
      {id:13, latitude: -41.331332, longitude: 174.830330},
      {id:14, latitude: -41.344210, longitude: 174.820702},
      {id:15, latitude: -41.341738, longitude: 174.809948},
      {id:16, latitude: -41.330750, longitude: 174.793898},
      {id:17, latitude: -41.341995, longitude: 174.784972},
      {id:18, latitude: -41.344476, longitude: 174.770853},
      {id:19, latitude: -41.348413, longitude: 174.765507},
      {id:20, latitude: -41.346197, longitude: 174.756091},

      //FOREST
      {id:21, latitude: -41.295969, longitude: 174.794316},
      {id:22, latitude: -41.293766, longitude: 174.790825},
      {id:23, latitude: -41.296561, longitude: 174.790494},
      {id:24, latitude: -41.298799, longitude: 174.791590},
      {id:25, latitude: -41.298444, longitude: 174.768400},
      {id:26, latitude: -41.297968, longitude: 174.766373},
      {id:27, latitude: -41.293838, longitude: 174.761238},
      {id:28, latitude: -41.295262, longitude: 174.768340},
      {id:29, latitude: -41.284192, longitude: 174.767345},
      {id:30, latitude: -41.290357, longitude: 174.753291},

       //CITY OR MISC
    
       {id:31, latitude: -41.296926, longitude: 174.774268},
       {id:32, latitude: -41.297769, longitude: 174.773163},
       {id:33, latitude: -41.296201, longitude: 174.774314},
       {id:34, latitude: -41.308096, longitude: 174.770909},
       {id:35, latitude: -41.293385, longitude: 174.774941},
       {id:36, latitude: -41.295095, longitude: 174.775434},
       {id:37, latitude: -41.293406, longitude: 174.775757},
       {id:38, latitude: -41.295630, longitude: 174.770862},
       {id:39, latitude: -41.292284, longitude: 174.773070},
       {id:40, latitude: -41.291445, longitude: 174.784443},


    ]));
