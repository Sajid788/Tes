const Revenue = require('../models/Revenue');

const getAllRevenue = async (req, res) => {
    try {
        const { month, year, category, sort = '-createdAt' } = req.query;

        
        let filter = {};
        if (month) filter.month = parseInt(month);
        if (year) filter.year = parseInt(year);
        if (category) filter.category = category;

        let revenue = await Revenue.find(filter).sort(sort);

        res.json({
            success: true,
            count: revenue.length,
            data: revenue
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};

const getRevenueByMonth = async (req, res) => {
    try {
        let month = req.params.month;
        let year = req.params.year;

        if (!month || !year) {
            return res.status(400).json({
                success: false,
                error: 'Please provide month and year'
            });
        }

        let revenue = await Revenue.getRevenueByMonth(parseInt(month), parseInt(year));
        let totalRevenue = await Revenue.getTotalRevenueByMonth(parseInt(month), parseInt(year));

        let revenueWithPercentages = revenue.map(item => {
            let obj = item.toObject();
            obj.percentage = item.getPercentage(totalRevenue);
            return obj;
        });

        res.json({
            success: true,
            data: {
                revenue: revenueWithPercentages,
                totalRevenue,
                month: parseInt(month),
                year: parseInt(year)
            }
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};


const getRevenueAnalytics = async (req, res) => {
    try {
        let month = req.query.month;
        let year = req.query.year;

        if (!month || !year) {
            return res.status(400).json({
                success: false,
                error: 'Month and year are required'
            });
        }

        let revenue = await Revenue.getRevenueByMonth(parseInt(month), parseInt(year));
        let totalRevenue = await Revenue.getTotalRevenueByMonth(parseInt(month), parseInt(year));

        let categoryBreakdown = await Revenue.aggregate([
            { $match: { month: parseInt(month), year: parseInt(year) } },
            { $group: { _id: '$category', total: { $sum: '$amount' } } },
            { $sort: { total: -1 } }
        ]);

        let topProducts = revenue.slice(0, 5);

        res.json({
            success: true,
            data: {
                totalRevenue,
                categoryBreakdown,
                topProducts,
                month: parseInt(month),
                year: parseInt(year)
            }
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};

const getRevenue = async (req, res) => {
    try {
        let revenue = await Revenue.findById(req.params.id);

        if (!revenue) {
            return res.status(404).json({
                success: false,
                error: 'Not found'
            });
        }

        res.json({
            success: true,
            data: revenue
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};

const getAvailablePeriods = async (req, res) => {
    try {
        let periods = await Revenue.aggregate([
            { $group: { _id: { month: '$month', year: '$year' } } },
            { $sort: { '_id.year': -1, '_id.month': -1 } }
        ]);

        let formattedPeriods = periods.map(p => ({
            month: p._id.month,
            year: p._id.year
        }));

        res.json({
            success: true,
            data: formattedPeriods
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};

module.exports = {
    getAllRevenue,
    getRevenueByMonth,
    getRevenueAnalytics,
    getRevenue,
    getAvailablePeriods
}; 