const connect = require('../connect/connect');

exports.getUser = async (username, callback) => {
    connect.query('SELECT * FROM `account` WHERE `username` = ?', [username], function (error, results, fields) {
        if (error) throw error;
        callback(results);
      });

};

exports.createUser = async (user, callback) => {
	connect.query('INSERT INTO `account` set `username` = ?, password = ?, email = ?', [user.username, user.pass, user.email], function (error, results, fields) {
        if (error) throw error;
        callback(results);
      });
};

exports.updateRefreshToken = async (username, refreshToken) => {
	connect.query('UPDATE  `account` set `refreshToken` = ? where username = ?', [refreshToken,username], function (error, results, fields) {
        if (error) throw error;
      });
};

exports.getRefreshToken = (refreshToken)=>{
  return new Promise((resolve, rejects)=>{
    connect.query('SELECT id, username, refreshToken from  `account` where refreshToken = ?', [refreshToken], function (error, results, fields) {
      if (error) rejects(error);
      resolve(results);
    });
  })
}