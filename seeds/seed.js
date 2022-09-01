const sequelize = require('../config/connection')
const { Comment, Post, User } = require('../models')

const commentSeed = require('./commentSeed.json')
const postSeed = require('./postSeed.json')
const userSeed = require('./userSeed.json')

const seedDatabase = async () => {
    await sequelize.sync({ force: true })

    const users = await User.bulkCreate(userSeed, {
        individualHooks: true,
        returning: true,
    })
    
    for (const post of postSeed) {
      const posts = await Post.create({
        ...post,
        user_id: users[Math.floor(Math.random() * users.length)].id,
      });
    }

    for (const comment of commentSeed) {
        await Comment.create({
            ...comment,
            user_id: users[Math.floor(Math.random() * users.length)].id,
        })
    }

    process.exit(0)
}

seedDatabase()