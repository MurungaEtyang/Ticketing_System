import sqlite3 from 'sqlite3';

// Function to save user data to the SQLite database
function saveUserToDatabase(firstname: string, lastname: string, email: string, password: string) {
    // Establish a connection to the SQLite database
    const db = new sqlite3.Database('database.db');

    // Create the 'users' table if it doesn't exist
    db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      firstname TEXT,
      lastname TEXT,
      email TEXT,
      password TEXT
    )
  `);

    // Insert the user's data into the 'users' table
    const insertQuery = `
    INSERT INTO users (firstname, lastname, email, password)
    VALUES (?, ?, ?, ?)
  `;
    db.run(insertQuery, [firstname, lastname, email, password], (err) => {
        if (err) {
            console.error('Error inserting user data:', err);
        } else {
            console.log('User data inserted successfully');
        }
    });

    // Close the database connection
    db.close();
}

export { saveUserToDatabase };