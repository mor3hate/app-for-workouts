import User from '../../models/userModel.js'
import asyncHandler from 'express-async-handler'
import { generateToken } from '../../helpers/generateToken.js'
// @desc Register user
// @route POST /api/users
// @access Public
export const register = asyncHandler(async (req, res) => {
	const { name, email, password } = req.body

	const isHaveUser = await User.findOne({ email })

	if (isHaveUser) {
		res.status(400)
		throw new Error('Данный пользователь уже зарегистрирован')
	}

	if (!name || !email || !password) {
		res.status(500)
		throw new Error('Укажите все поля')
	}

	const user = await User.create({
		name,
		email,
		password,
	})

	const token = generateToken(user._id)
	res.json({ user, token })
})
