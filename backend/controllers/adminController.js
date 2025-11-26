const ReportModel = require('../models/reportModel');

exports.getDashboardStats = (req, res) => {
    // Placeholder for stats logic
    const reports = ReportModel.getAll();
    const stats = {
        total: reports.length,
        pending: reports.filter(r => r.status === 'Pending').length,
        resolved: reports.filter(r => r.status === 'Resolved').length
    };
    res.json(stats);
};
