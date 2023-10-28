const LinkMindsModel = require("../models/LinkMindsModel");

async function Middleware(req, res, next) {
  const token = req.headers['x-access-token'];
  const { token2 } = req.body;
  const result = await LinkMindsModel.findOne({ token: token });
  const result2 = await LinkMindsModel.findOne({ token: token2 });

  if (result || result2) {
    next();
  } else {
    res.redirect('/');
  }
}
module.exports = Middleware;