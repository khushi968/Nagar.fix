const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../data/reports.json');

const readData = () => {
    try {
        const data = fs.readFileSync(dataPath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        return [];
    }
};

const writeData = (data) => {
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
};

module.exports = {
    getAll: () => readData(),
    create: (report) => {
        const reports = readData();
        const newReport = { id: Date.now().toString(), ...report, status: 'Pending', createdAt: new Date().toISOString() };
        reports.push(newReport);
        writeData(reports);
        return newReport;
    },
    updateStatus: (id, status) => {
        const reports = readData();
        const index = reports.findIndex(r => r.id === id);
        if (index !== -1) {
            reports[index].status = status;
            writeData(reports);
            return reports[index];
        }
        return null;
    },
    getById: (id) => {
        const reports = readData();
        return reports.find(r => r.id === id);
    }
};
