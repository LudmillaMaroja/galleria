import Database from './database.js';

async function up() {
  const db = await Database.connect();

  const typeSql = `
    CREATE TABLE types (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name VARCHAR(20) NOT NULL
    )
  `;

  await db.run(typeSql);
  
  const postsSql = `
    CREATE TABLE posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title VARCHAR(20) NOT NULL,
      date VARCHAR(20) NOT NULL,
      description TEXT NOT NULL,
      image VARCHAR(50) NOT NULL,
      type_id INTEGER NOT NULL,
      FOREIGN KEY (type_id) REFERENCES types (id)
    )
  `;
  
  await db.run(postsSql);

  const foodsSql = `
  CREATE TABLE foods (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(20) NOT NULL,
    image VARCHAR(50) NOT NULL,
    price DOUBLE NOT NULL,
    category_id INTEGER NOT NULL REFERENCES categories (id)
  )
`;

  await db.run(foodsSql);

const usersSql = `
  CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(20) NOT NULL CHECK(LENGTH(password) >= 8)
  )
`;

  await db.run(usersSql);

}

export default { up };
