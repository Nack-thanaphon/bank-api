module.exports = {
  attributes: {
    type: {
      type: 'string',
      isIn: ['deposit', 'withdrawal', 'transfer'],
      required: true
    },
    amount: {
      type: 'number',
      required: true
    },
    account: {
      model: 'account',
      required: true
    }
  }
};
