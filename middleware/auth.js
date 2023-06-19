const userModel = require('../model/user')
const authMethod = require('../model/generateToken')
const jwt = require('jsonwebtoken');

exports.isAuth = async (req, res, next) => {
	const accessTokenFromHeader = req.headers.authorization;
	if (!accessTokenFromHeader) {
		return res.status(401).send('Không tìm thấy access token!');
	}

	const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

	jwt.verify(accessTokenFromHeader, accessTokenSecret, (err, user) => {
		if (err) {
			if(err.message && err.message.includes("expired")){
					creatAccessToken(req,res, next)
				return
			}else
			return res.sendStatus(403);
		}
	
		req.user = user;
		next();
	  });


};

const creatAccessToken =  (req,res, next)=>{
	let refreshToken = req.headers.refreshtoken
	console.log(refreshToken);
	 userModel.getRefreshToken(refreshToken).then(async rs=>{
		if(rs.length !== 0){
			const accessTokenLife = process.env.ACCESS_TOKEN_LIFE;
			const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
			const dataForAccessToken = {
				username: rs[0].username,
				id : rs[0].id
			};
			const accessToken = await authMethod.generateToken(
				dataForAccessToken,
				accessTokenSecret,
				accessTokenLife,
			);
			if (!accessToken) {
				return res
					.status(401)
					.send('Đăng nhập không thành công, vui lòng thử lại.');
			}
			 res.send(accessToken)
			req.user = dataForAccessToken;
			next();
		}
	})

}