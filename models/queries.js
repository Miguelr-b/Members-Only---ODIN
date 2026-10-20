const pool = require("./pool");

// getUserById, getByUsername,  postSignUp, updateUser, deleteUser, giveMemberShip  USER
// getAllMessages, postMessage, deleteMessage, likeMessage, unlikeMessage        MESSAGE


// USER
async function getUserById(id) {
    const { rows } = await pool.query( 
      `SELECT * FROM user WHERE id = $1`,[id]
    );

    return rows[0];
}

async function getByUsername(username) {
    const { rows } = await pool.query( 
      `SELECT * FROM user WHERE username = $1`,[username]
    );

    return rows[0];
}

async function postSignUp(user) {
  await pool.query("INSERT INTO user (username, name, email, password, membership) VALUES ($1, $2, $3, $4, $5)", 
    [ user.username, 
      user.name, 
      user.email, 
      user.password, 
      user.membership, 
    ]);
}

async function updateUser(id, user) {

  const { rowCount } = await pool.query(
    `UPDATE user
     SET username = $1,
         name = $2,
         email = $3,
         password = $4,
         membership = $5,
     WHERE id = $6`,
    [
      product.name,
      product.description,
      product.code,
      product.price,
      product.coin,
      id,
    ]
  );

  if (rowCount === 0) {
    throw new Error("User not Found.");
  }
}

async function deleteUser(id) {
  const { rowCount } = await pool.query(
    "DELETE FROM user WHERE id = $1",
    [id]
  );

  if (rowCount === 0) {
    throw new Error("User not Found.");
  }
}


async function giveMemberShip(id, user) {
  const { rowCount } = await pool.query(
    `UPDATE user
     SET membership = 'member',
     WHERE id = $1`,
    [id,]
  );

  if (rowCount === 0) {
    throw new Error("User not Found.");
  }
}


// MESSAGE

async function getAllMessages(order) {
  const { rows } = await pool.query("SELECT * FROM message ORDER BY $1", [order]);
  return rows;
}

async function postMessage(idUser, message) {
  await pool.query("INSERT INTO message (title, date_posted, content, user_id) VALUES ($1, $2, $3, $4)", 
    [ message.title, 
      new Date(),
      message.content,
      idUser, 
    ]);
}

async function deleteMessage(messageId) {
  const { rowCount } = await pool.query(
    "DELETE FROM message WHERE id = $1",
    [messageId]
  );

  if (rowCount === 0) {
    throw new Error("Product not Found.");
  }
}

async function likeMessage(userId, messageId) {
  await pool.query(
    `INSERT INTO message_likes (user_id, message_id)
     VALUES ($1, $2)
     ON CONFLICT DO NOTHING`,
    [userId, messageId]
  );
}

async function unlikeMessage(userId, messageId) {
  await pool.query(
    "DELETE FROM message_likes WHERE user_id = $1 AND message_id = $2",
    [userId, messageId]
  );
}

module.exports = {
    getUserById,
    getByUsername,
    postSignUp,
    updateUser,
    deleteUser,
    giveMemberShip,


    getAllMessages,
    postMessage,
    deleteMessage,
    likeMessage,
    unlikeMessage
};