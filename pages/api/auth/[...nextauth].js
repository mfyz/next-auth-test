import NextAuth from 'next-auth'
import EmailProvider from "next-auth/providers/email"
import FacebookProvider from 'next-auth/providers/facebook'
import GithubProvider from 'next-auth/providers/github'
import TwitterProvider from 'next-auth/providers/twitter'
import SequelizeAdapter from "@next-auth/sequelize-adapter"
import { Sequelize } from "sequelize"

const sequelize = new Sequelize({
	dialect: 'sqlite',
	storage: './db.sqlite',
})

const dbAdapter = SequelizeAdapter(sequelize, {
	// models: {
	// 	User: sequelize.define("user", {
	// 		// ...models.User,
	// 		phoneNumber: DataTypes.STRING,
	// 	}),
	// }
})

sequelize.sync() // Note: not to be used in production

export default NextAuth({
	adapter: dbAdapter,
	providers: [
		EmailProvider({
			server: process.env.EMAIL_SERVER,
			from: process.env.EMAIL_FROM,
		}),
		GithubProvider({
			clientId: process.env.GITHUB_ID,
			clientSecret: process.env.GITHUB_SECRET,
		}),
		// FacebookProvider({
		// 	clientId: process.env.FACEBOOK_ID,
		// 	clientSecret: process.env.FACEBOOK_SECRET,
		// }),
		// TwitterProvider({
		// 	clientId: process.env.TWITTER_ID,
		// 	clientSecret: process.env.TWITTER_SECRET,
		// }),
	],
	secret: process.env.SECRET,
	session: {
		strategy: 'jwt',
		maxAge: 30 * 24 * 60 * 60, // 30 days
	},
	debug: true,
	theme: {
		colorScheme: 'light',
	},
})
