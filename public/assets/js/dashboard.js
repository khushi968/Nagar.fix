document.addEventListener('DOMContentLoaded', async () => {
    const tableBody = document.querySelector('#reportsTable tbody');
    const totalEl = document.getElementById('totalReports');
    const pendingEl = document.getElementById('pendingReports');
    const resolvedEl = document.getElementById('resolvedReports');

    // Modal elements
    const modal = document.getElementById('replyModal');
    const closeBtn = document.querySelector('.close');
    const sendReplyBtn = document.getElementById('sendReplyBtn');
    const generatedReply = document.getElementById('generatedReply');
    let currentReportForReply = null;

    async function loadReports() {
        const reports = await Storage.getAllReports();
        renderStats(reports);
        renderTable(reports);
    }

    function renderStats(reports) {
        totalEl.textContent = reports.length;
        pendingEl.textContent = reports.filter(r => r.status === 'Pending').length;
        resolvedEl.textContent = reports.filter(r => r.status === 'Resolved').length;
    }

    function renderTable(reports) {
        tableBody.innerHTML = '';
        reports.forEach(report => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>#${report.id.slice(-4)}</td>
                <td>${report.name}</td>
                <td>${report.location}</td>
                <td>${report.category}</td>
                <td><span class="severity ${report.severity.toLowerCase()}">${report.severity}</span></td>
                <td>${report.description.substring(0, 50)}...</td>
                <td><span class="status-badge status-${report.status.toLowerCase()}">${report.status}</span></td>
                <td>
                    <select onchange="updateStatus('${report.id}', this.value)">
                        <option value="Pending" ${report.status === 'Pending' ? 'selected' : ''}>Pending</option>
                        <option value="In-Progress" ${report.status === 'In-Progress' ? 'selected' : ''}>In-Progress</option>
                        <option value="Resolved" ${report.status === 'Resolved' ? 'selected' : ''}>Resolved</option>
                    </select>
                    <button class="btn btn-sm btn-link" onclick="openReplyModal('${report.id}')">Auto-Reply</button>
                </td>
            `;
            tableBody.appendChild(tr);
        });
    }

    window.updateStatus = async (id, status) => {
        await Storage.updateStatus(id, status);
        loadReports(); // Refresh
    };

    window.openReplyModal = async (id) => {
        const reports = await Storage.getAllReports();
        const report = reports.find(r => r.id === id);
        if (!report) return;

        currentReportForReply = report;
        document.getElementById('modalReportDetails').textContent = `Replying to: ${report.name} - ${report.category}`;
        generatedReply.value = 'Generating AI reply...';
        modal.style.display = 'block';

        const reply = await AI.generateReply(report);
        generatedReply.value = reply;
    };

    closeBtn.onclick = () => {
        modal.style.display = 'none';
    };

    window.onclick = (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    };

    sendReplyBtn.onclick = () => {
        alert(`Reply sent to ${currentReportForReply.name} (Simulated)`);
        modal.style.display = 'none';
    };

    // Initial Load
    loadReports();
});
