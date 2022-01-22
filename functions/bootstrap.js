const { addMiddleware } = require('../utils/security');
const { addAdminUser } = require('../fixtures/addAdminUser')

module.exports = async (req, res, next) => {
  console.log('bootstrap started');
  addMiddleware(req, res, next);
  await addAdminUser();
  res.status(200).send(`Bootstrap Completed`);
};
