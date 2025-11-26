const STORAGE_MODE = 'BACKEND'; // Options: 'LOCAL', 'BACKEND'
const API_BASE_URL = 'http://localhost:3000/api';

const Storage = {
    async createReport(report) {
        if (STORAGE_MODE === 'BACKEND') {
            try {
                const response = await fetch(`${API_BASE_URL}/reports`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(report)
                });
                return await response.json();
            } catch (error) {
                console.error('Backend error, falling back to local:', error);
                return this.createLocal(report);
            }
        } else {
            return this.createLocal(report);
        }
    },

    async getAllReports() {
        if (STORAGE_MODE === 'BACKEND') {
            try {
                const response = await fetch(`${API_BASE_URL}/reports`);
                return await response.json();
            } catch (error) {
                console.error('Backend error, falling back to local:', error);
                return this.getAllLocal();
            }
        } else {
            return this.getAllLocal();
        }
    },

    async updateStatus(id, status) {
        if (STORAGE_MODE === 'BACKEND') {
            try {
                const response = await fetch(`${API_BASE_URL}/reports/${id}`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ status })
                });
                return await response.json();
            } catch (error) {
                console.error('Backend error, falling back to local:', error);
                return this.updateLocal(id, status);
            }
        } else {
            return this.updateLocal(id, status);
        }
    },

    // LocalStorage Fallbacks
    createLocal(report) {
        const reports = this.getAllLocal();
        const newReport = {
            id: Date.now().toString(),
            ...report,
            status: 'Pending',
            createdAt: new Date().toISOString()
        };
        reports.push(newReport);
        localStorage.setItem('reports', JSON.stringify(reports));
        return newReport;
    },

    getAllLocal() {
        return JSON.parse(localStorage.getItem('reports') || '[]');
    },

    updateLocal(id, status) {
        const reports = this.getAllLocal();
        const index = reports.findIndex(r => r.id === id);
        if (index !== -1) {
            reports[index].status = status;
            localStorage.setItem('reports', JSON.stringify(reports));
            return reports[index];
        }
        return null;
    }
};
