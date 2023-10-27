function Middleware(req, res, next) {
  const token = req.body;
  if (token) {
    next();
  } else {
    res.redirect('/');
  }
}
module.exports = Middleware;