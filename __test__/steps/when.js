require('dotenv').config()

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
  we_invoke_confirmUserSignup
}