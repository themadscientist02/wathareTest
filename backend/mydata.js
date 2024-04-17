const fs = require('fs');
const mysql = require('mysql2');

// Read the JSON file
const jsonFile = 'C:\\Users\\abhi\\Downloads\\sample-data.json';

fs.readFile(jsonFile, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading JSON file:', err);
        return;
    }

    // Parse JSON data
    const jsonData = JSON.parse(data);

    // Connect to MySQL database
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'manager',
        database: 'wathare'
    });

    connection.connect((err) => {
        if (err) {
            console.error('Error connecting to MySQL:', err);
            return;
        }
        console.log('Connected to MySQL database.');

        // Insert data into machine_code table
        const sql = 'INSERT INTO machine_data (ts, machine_status, vibration) VALUES ?';
        const values = jsonData.map(record => {
            // Adjust timestamp format to fit MySQL's DATETIME format
            const timestamp = new Date(record.ts).toISOString().slice(0, 19).replace('T', ' '); // Convert to MySQL DATETIME format
            return [timestamp, record.machine_status, record.vibration];
        });

        connection.query(sql, [values], (err, result) => {
            if (err) {
                console.error('Error inserting data into MySQL:', err);
                return;
            }
            console.log('Data inserted into MySQL successfully.');
            connection.end(); // Close connection
        });
    });
});
