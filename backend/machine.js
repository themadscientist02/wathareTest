const express = require('express')
const router = express.Router()
const db = require('./db')
const utils = require('./utils')


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


router.get('/:start/:end', async (request, response) => {
  try {
    const { start, end } = request.params; // Extract start and end timestamps from URL parameters

    const statement = `
    SELECT calendar.ts, COALESCE(machine_data.machine_status, -1) AS machine_status, COALESCE(machine_data.vibration, 0) AS vibration
FROM (
    SELECT TIMESTAMPADD(SECOND, n - 1, ?) AS ts
    FROM (
        SELECT units.n + tens.n * 10 + hundreds.n * 100 AS n
        FROM
            (SELECT 0 AS n UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9) units,
            (SELECT 0 AS n UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9) tens,
            (SELECT 0 AS n UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9) hundreds
    ) AS numbers
    WHERE TIMESTAMPADD(SECOND, n - 1, ?) <= NOW()
) AS calendar
LEFT JOIN machine_data ON calendar.ts = machine_data.ts
ORDER BY calendar.ts;
    `;

    const [result] = await db.execute(statement, [start, end]);
    response.send(utils.createSuccess(result));
  } catch (ex) {
    response.send(utils.createError(ex));
  }
});


module.exports = router
