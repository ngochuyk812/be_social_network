const userModel = require('../model/user')
const authMethod = require('../model/generateToken')
const randToken = require('rand-token')
const bcrypt = require('bcrypt')
require('dotenv').config();

exports.login = async (req,res)=>{
    let username  = req.body.username
    let password  = req.body.password
	const user = await userModel.getUser(username, async(rs)=>{

		if (rs.length === 0) {
			return res.status(401).send('Tên đăng nhập không tồn tại.');
		}
		const isPasswordValid = bcrypt.compareSync(password, rs[0].password);
		if (!isPasswordValid) {
			return res.status(401).send('Mật khẩu không chính xác.');
		}
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
		let refreshToken
		console.log(rs);
		if (!rs[0].refreshToken) {
			refreshToken = randToken.generate(100); 
			await userModel.updateRefreshToken(rs[0].username, refreshToken);
		} else {
			refreshToken = rs[0].refreshToken;
		}

		return res.json({
			msg: 'Đăng nhập thành công.',
			accessToken,
			refreshToken,
			user,
		});
	});
	

	

	
}



exports.register =  async (req, res) => {
	console.log(req.body);
	const username = req.body.username.toLowerCase().trim();
	const email = req.body.email.trim();
	userModel.getUser(username, async(rs)=>{
		if (rs.length > 0) res.status(409).send('Tên tài khoản đã tồn tại.');
		else {
			const hashPassword = bcrypt.hashSync(req.body.password, 10);
			const newUser = {
				username: username,
				pass: hashPassword,
				email
			};
			userModel.createUser(newUser,(rs2)=>{
				console.log(rs2);
				if (!rs2) {
					return res
						.status(400)
						.send('Có lỗi trong quá trình tạo tài khoản, vui lòng thử lại.');
				}
				return res.send({
					username,
				});
			});
			
			
		}
	});
	
};