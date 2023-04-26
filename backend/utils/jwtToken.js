//Create and send tocke and save in the cookie

const sendToken = (user, statusCode, res) => {
  // Create JWT tocken
  const token = user.getJwtToken();

  // Opetion for the Cookie
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    token: token,
  });
};
module.exports = sendToken;
