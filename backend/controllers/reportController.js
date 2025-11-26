const ReportModel = require('../models/reportModel');

exports.createReport = (req, res) => {
    try {
        const { name, location, category, description, severity, imageUrl } = req.body;
        if (!description || !location) {
            return res.status(400).json({ message: 'Description and Location are required' });
        }
        const newReport = ReportModel.create({ name, location, category, description, severity, imageUrl });
        res.status(201).json(newReport);
    } catch (error) {
        res.status(500).json({ message: 'Error creating report', error: error.message });
    }
};

exports.getAllReports = (req, res) => {
    try {
        const reports = ReportModel.getAll();
        res.json(reports);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching reports', error: error.message });
    }
};

exports.updateReportStatus = (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const updatedReport = ReportModel.updateStatus(id, status);
        if (!updatedReport) {
            return res.status(404).json({ message: 'Report not found' });
        }
        res.json(updatedReport);
    } catch (error) {
        res.status(500).json({ message: 'Error updating report', error: error.message });
    }
};
