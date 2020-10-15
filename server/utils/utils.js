const crypto = require('crypto');

exports.genPassword =  (passowrd) => {
  const salt =  crypto.randomBytes(32).toString('hex');
  const hash =  crypto.pbkdf2Sync(passowrd, salt, 10000, 64, 'sha512').toString('hex');

  return {
    salt: salt,
    hash: hash
  }
}

exports.checkPassword =  (password, hash, salt) => {
  const verifyHash =  crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
  return hash === verifyHash;
} 

exports.issueJWT = (user) => {
  const id = user.id;
  const expiresIn = '1d';

  const payload = {
    sub: id,
    iat: Date.now()
  };

  const signToken = jsonwebtoken.sign(payload, PRIV_KEY, { expiresIn: expiresIn, algorithm: 'RS256' });

  return {
    token: "Bearer " + signToken,
    expires: expiresIn
  }
}
