module.exports = {
  attributes: {
    accountNumber: {
      type: 'string',
      required: true,
      unique: true
    },
    accountHolderName: {
      type: 'string',
      required: true
    },
    balance: {
      type: 'number',
      defaultsTo: 0.0
    }
  }
};
