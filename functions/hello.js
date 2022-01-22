//I am a comment

const { addMiddleware } = require('../utils/security');
module.exports = (req, res, next) => {
  addMiddleware(req, res, next);
  res.status(200).send(`Nhost, from Javascript, pays it's respects to ${req.body.query.name} @ ${req.requestTime} !`);
};
