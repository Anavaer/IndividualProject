const controller = require("../controllers/wallet.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/investment/add",
    controller.addInvestment
  );

  app.delete(
    "/api/investment/delete",
    controller.deleteInvestment
  );

  app.put(
    "/api/investment/edit",
    controller.editInvestment
  );

  app.get(
    "/api/investment/:id",
    controller.getInvestments
  );
};
