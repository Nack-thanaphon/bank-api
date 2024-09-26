module.exports = {
    // Record a transaction
    create: async function (req, res) {
      try {
        const { type, amount, accountId } = req.body;
        const account = await Account.findOne({ id: accountId });
  
        if (!account) {
          return res.status(404).json({ message: 'Account not found' });
        }
  
        if (type === 'withdrawal' && account.balance < amount) {
          return res.status(400).json({ message: 'Insufficient balance' });
        }
  
        const newTransaction = await Transaction.create({
          type,
          amount,
          account: accountId
        }).fetch();
  
        if (type === 'deposit') {
          account.balance += amount;
        } else if (type === 'withdrawal') {
          account.balance -= amount;
        }
  
        await Account.update({ id: accountId }).set({ balance: account.balance });
  
        return res.status(201).json(newTransaction);
      } catch (err) {
        return res.serverError(err);
      }
    },
  
    // Get transaction history for an account
    findByAccount: async function (req, res) {
      try {
        const transactions = await Transaction.find({ account: req.params.accountId });
        return res.json(transactions);
      } catch (err) {
        return res.serverError(err);
      }
    }
  };
  