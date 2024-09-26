module.exports = {
    // Create new account
    create: async function (req, res) {
      try {
        const { accountNumber, accountHolderName } = req.body;
        const newAccount = await Account.create({
          accountNumber,
          accountHolderName
        }).fetch();
        return res.status(201).json(newAccount);
      } catch (err) {
        return res.serverError(err);
      }
    },
  
    // Get account details
    find: async function (req, res) {
      try {
        const accounts = await Account.find();
        return res.json(accounts);
      } catch (err) {
        return res.serverError(err);
      }
    },
  
    // Get account by ID
    findOne: async function (req, res) {
      try {
        const account = await Account.findOne({ id: req.params.id });
        if (!account) {
          return res.status(404).json({ message: 'Account not found' });
        }
        return res.json(account);
      } catch (err) {
        return res.serverError(err);
      }
    },
  
    // Update balance (for deposit/withdrawal)
    updateBalance: async function (req, res) {
      try {
        const accountId = req.params.id;
        const { amount } = req.body;
        const account = await Account.findOne({ id: accountId });
        if (!account) {
          return res.status(404).json({ message: 'Account not found' });
        }
        account.balance += amount;
        await Account.update({ id: accountId }).set({ balance: account.balance });
        return res.json({ balance: account.balance });
      } catch (err) {
        return res.serverError(err);
      }
    }
  };
  