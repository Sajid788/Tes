const mongoose = require('mongoose');

//  revenue schema
const revenueSchema = new mongoose.Schema({
  product: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  month: {
    type: Number,
    required: true,
    min: 1,
    max: 12
  },
  year: {
    type: Number,
    required: true,
    min: 2020,
    max: 2030
  },
  category: {
    type: String,
    required: true,
    trim: true,
    enum: ['Electronics', 'Clothing', 'Food', 'Books', 'Sports', 'Other']
  },
  description: {
    type: String,
    trim: true,
    maxlength: 500
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});


revenueSchema.index({ month: 1, year: 1, product: 1 });



revenueSchema.virtual('formattedDate').get(function() {
  let months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  return months[this.month - 1] + ' ' + this.year;
});


revenueSchema.statics.getRevenueByMonth = async function(month, year) {
  return await this.find({ month: month, year: year }).sort({ amount: -1 });
};

revenueSchema.statics.getTotalRevenueByMonth = async function(month, year) {
  let result = await this.aggregate([
    { $match: { month: month, year: year } },
    { $group: { _id: null, total: { $sum: '$amount' } } }
  ]);
  return result.length > 0 ? result[0].total : 0;
};


revenueSchema.methods.getPercentage = function(totalRevenue) {
  return totalRevenue > 0 ? ((this.amount / totalRevenue) * 100).toFixed(2) : 0;
};

module.exports = mongoose.model('Revenue', revenueSchema);