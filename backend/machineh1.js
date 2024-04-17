const express = require('express')
const router = express.Router()
const db = require('../db')
const utils = require('../utils')

// router.get('/:start/:end', async (request, response) => {
//   try {
//     const statement = `
//     SELECT calendar.ts, machine_data.machine_status, machine_data.vibration
//     FROM (
//         SELECT TIMESTAMPADD(SECOND, n - 1, ?) AS ts
//         FROM (
//             SELECT units.n + tens.n * 10 AS n
//             FROM
//                 (SELECT 0 AS n UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9) units,
//                 (SELECT 0 AS n UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9) tens
//         ) AS numbers
//         WHERE TIMESTAMPADD(SECOND, n - 1, ?) <= NOW()
//     ) AS calendar
//     LEFT JOIN machine_data ON calendar.ts = machine_data.ts
//     ORDER BY calendar.ts;
    
//         `
//     const [result] = await db.execute(statement, [start],[end])
//     response.send(utils.createSuccess(result))
//   } catch (ex) {
//     response.send(utils.createError(ex))
//   }
// })

router.get('/data', async (request, response) => {
  try {
     // Extract start and end timestamps from URL parameters

    const statement = `
  select ts, machine_status from machine_data order by ts;
 `;

    const [result] = await db.execute(statement, []);
    response.send(utils.createSuccess(result));
  } catch (ex) {
    response.send(utils.createError(ex));
  }
});

router.get('/:start/:end', async (request, response) => {
  try {
    function millisecondsToTimestamp(milliseconds) {
      // Create a new Date object with the milliseconds since the epoch
      var date = new Date(milliseconds);
  
      // Extract the components of the date
      var year = date.getUTCFullYear();
      var month = ('0' + (date.getUTCMonth() + 1)).slice(-2); // Add 1 because months are zero-indexed
      var day = ('0' + date.getUTCDate()).slice(-2);
      var hours = ('0' + date.getUTCHours()).slice(-2);
      var minutes = ('0' + date.getUTCMinutes()).slice(-2);
      var seconds = ('0' + date.getUTCSeconds()).slice(-2);
  
      // Construct the timestamp string
      var timestamp = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;
  
      return timestamp;
  }
  
  // Example usage
  // var millisecondsSinceEpoch = 1643644800000; // For example, milliseconds representing "2024-02-01 00:00:00"
  // var formattedTimestamp = millisecondsToTimestamp(millisecondsSinceEpoch);
  // console.log(formattedTimestamp);
    const { start, end } = request.params; // Extract start and end timestamps from URL parameters
    const start1 = millisecondsToTimestamp(start);
    const end1 = millisecondsToTimestamp(end);
    const statement = `
    select ts, machine_status, vibration from machine_data where ts in between ${start1} and ${end1}  and mchine_status is not null order by ts;
 `;

    const [result] = await db.execute(statement, [start, end]);
    response.send(utils.createSuccess(result));
  } catch (ex) {
    response.send(utils.createError(ex));
  }
});


module.exports = router
