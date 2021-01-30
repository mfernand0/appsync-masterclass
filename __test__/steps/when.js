require('dotenv').config()
const AWS = require('aws-sdk')

const a_user_signs_up = async(name, email, password) => {
  const cognito = new AWS.CognitoIdentityServiceProvider()
  const userPoolId = process.env.COGNITO_USER_POOL_ID
  const clientId = process.env.WEB_COGNITO_USER_POOL_CLIENT_ID
  
  const signUpResp = await cognito.signUp({
    ClientId: clientId,
    Username: email,
    Password: password,
    UserAttributes: [
      {Name: 'name', Value: name}
    ]
  }).promise()

  const username = signUpResp.UserSub
  console.log(`[${email}] - user has signed up [${username}]`)

  await cognito.adminConfirmSignUp({
    UserPoolId: userPoolId,
    Username: username
  }).promise()

  console.log(`[${email}] - confirmed sign up`)
  return {
    username, 
    name, 
    email
  }
}


const we_invoke_confirmUserSignup = async(username, name, email) => {
  console.log('the event is like ' + username, name, email);
  const handler = require('../../functions/confirm-user-signup').handler

  const context = {}
  const event = {
    "version": "1",
    "region": process.env.AWS_REGION,
    "userPoolId": process.env.COGNITO_USER_POOL_ID,
    "userName": username,
    "triggerSource": "PostConfirmation_ConfirmSignUp",
    "request": {
      "userAttributes":{
        "sub": username,
        "cognito:user_status": "CONFIRMED",
        "cognito:email_alias": email,
        "email_verified": "false",
        "name": name,
        "email": email
      }
    },
    "response": {}
  }

  await handler(event, context)
}

module.exports = {
  we_invoke_confirmUserSignup,
  a_user_signs_up
}