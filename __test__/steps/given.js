const chance = require('chance').Chance()

const a_random_user = () => {
  const firstName = chance.first({ nationality: 'en' })
  const lastName = chance.first({ nationality: 'en' })
  const suffix = chance.string({ lenght: 4, pool: 'abdcefghijklmnopqrstuvwxyz'})
  const name = `${firstName} ${lastName} ${suffix}`
  const password = chance.string({ length:8 })
  const email = `${firstName}-${lastName}-${suffix}@appsyncmasterclass.com`

  console.log(`the random user is ${firstName} ${lastName} ${email} ${name} ${password}`)

  return{
    name,
    password,
    email
  }
}

module.exports = {
  a_random_user
}