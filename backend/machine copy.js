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


router.get('/:start/:end', async (request, response) => {
  try {
    const { start, end } = request.params; // Extract start and end timestamps from URL parameters

    // Create a new Date object with the frequency
// const date = new Date(start);
let arrayOfObjects = [];



//console.log(timestamp);

    const statement = `
    SELECT 
    UNIX_TIMESTAMP(ts) * 1000 AS ts,
    vibration,
    machine_status
FROM 
    machine_data;

    `;

    const [result] = await db.execute(statement, []);

    function MyObject(times, status,vib) {
      this.ts = times;
      this.machine_status = status;
      this.vibration=vib;
    }
    
    // Function to add objects to the array
    function addObject(times, status,vib) {
      let newObj = new MyObject(ts, machine_status,vibration);
      arrayOfObjects.push(newObj);
    }


    for(start<=end;start+1000;){
if(start===result.values.ts){
addObject(result.values.ts,result.values.machine_status,result.values.vibration);
}
else{
  
addObject(result.values.ts,-1,0);
}
    }

    console.log(arrayOfObjects);
    response.send(utils.createSuccess(arrayOfObjects));
  } catch (ex) {
    response.send(utils.createError(ex));
  }
});


module.exports = router
