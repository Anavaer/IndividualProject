const Wallet = require('../models/wallet.model');

exports.addInvestment = async (req, res) => {
  try {
    Wallet.findOne({user: req.body.userId}).exec(async (err, wallet) => {
      if (!wallet) {
        const newWallet = await Wallet.create({
          user: req.body.userId,
          investments: [{
            name: req.body.name,
            price: req.body.price,
            volume: req.body.volume,
            position: req.body.position,
          }]
        });
        newWallet.save()
      } else {
        const newWallet = {
          user: req.body.userId,
          investments: wallet.investments.concat({
            name: req.body.name,
            price: req.body.price,
            volume: req.body.volume,
            position: req.body.position,
          })
        };

        await Wallet.update({_id: wallet._id}, newWallet);
      }
      Wallet.findOne({user: req.body.userId}).exec(async (err, wallet) => {
        res.status(200).send(wallet);
      })
    });
  } catch (e) {
    console.error(e);
    res.send(e);
  }
};

exports.editInvestment = async (req, res) => {
  try {
    Wallet.findOne({user: req.body.userId}).exec(async (err, wallet) => {
      const newWallet = {
        user: req.body.userId,
        investments: wallet.investments.map((data, index) => {
          if (data._id == req.body.data._id) {
            return {
              _id: data._id,
              name: req.body.data.name,
              price: req.body.data.price,
              volume: req.body.data.volume,
              position: req.body.data.position,
            }
          }
          return data;
        })
      };

      await Wallet.update({_id: wallet._id}, newWallet);

      Wallet.findOne({user: req.body.userId}).exec(async (err, wallet) => {
        res.status(200).send(wallet);
      })
    });
  } catch (e) {
    console.error(e);
    res.send(e);
  }
};


exports.deleteInvestment = async (req, res) => {
  try {
    Wallet.findOne({user: req.body.userId}).exec(async (err, wallet) => {
      const newWallet = {
        user: req.body.userId,
        investments: wallet.investments.filter((element, index) => index !== req.body.row)
      };

      await Wallet.update({_id: wallet._id}, newWallet);

      Wallet.findOne({user: req.body.userId}).exec(async (err, wallet) => {
        res.status(200).send(wallet);
      })
    });
  } catch (e) {
    console.error(e);
    res.send(e);
  }
};

exports.getInvestments = async (req, res) => {
  try {
    Wallet.findOne({user: req.params.id}).exec(async (err, wallet) => {
      res.status(200).send(wallet);
    })
  } catch (e) {
    console.error(e);
    res.send(e);
  }
};
