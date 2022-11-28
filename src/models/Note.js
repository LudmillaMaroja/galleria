import Database from '../database/database.js';
const c = console;


async function readAll() {
  const db = await Database.connect();

  const sql = `
    SELECT 
      *
    FROM 
      posts
  `;

  const dinos = await db.all(sql);

  c.log(dinos);
  return dinos;
}

async function readPost(id) {
  const db = await Database.connect();

  const sql = `
    SELECT 
      *
    FROM 
      posts
    WHERE
      id = ?
  `;

  const post = await db.get(sql, [id]);

  return post;
}

async function read(id) {
  const db = await Database.connect();

  const sql = `
  SELECT 
    *
  FROM 
    dinos
  WHERE
    id = ?
  `;

  

  const dino = await db.get(sql, [id]);

  return dino;
}

async function create(post) {
  const db = await Database.connect();

  const { title, date, description, image, type_id } = post;
  c.log(title, date, description, image, type_id);
  const sql = `
    INSERT INTO
      posts (title, date, description, image, type_id)
    VALUES
      (?, ?, ?, ?, ?)
  `;

  const { lastID } = await db.run(sql, [title, date, description, image, type_id]);
  c.log('ate aqui ta dboa');

  return lastID;
}

async function update(post, id) {
  const db = await Database.connect();
  const { title, date, description, image, type_id  } = post;

  const sql = `
    UPDATE 
      posts
    SET
      title = ?, date = ?, description = ?, image = ?, type_id = ?
    WHERE
      id = ?
  `;

  const { changes } = await db.run(sql, [title, date, description, image, type_id, id]);

  c.log(changes)

  if (changes === 1) {

    return read(id);
  } else {
    return false;
  }
}

async function destroy(id) {
  const db = await Database.connect();

  const sql = `
    DELETE FROM
      posts
    WHERE
      id = ?
  `;

  const { changes } = await db.run(sql, [id]);

  return changes === 1;
}

export default { readAll, read, readPost, create, update, destroy };
