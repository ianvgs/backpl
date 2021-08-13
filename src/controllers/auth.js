const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const dotenv = require('dotenv').config();



async function validate(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({message:'Não esta sendo enviado um token, realize o login'});
  }

  const [, token] = authorization.split('Bearer ');

  try {
    await promisify(jwt.verify)(token, process.env.JWT_KEY);   
    return next();
  } catch (err) {
    return res.status(401).json({message:'O token é invalido'});
  }
}

module.exports = validate;

