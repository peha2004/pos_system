// controller/SectionController.js
const SectionController = {
    init() {
        this.bindTabEvents();
    },

    bindTabEvents() {
        $('a[data-bs-toggle="tab"]').on('shown.bs.tab', (e) => {
            const target = $(e.target).attr('href');
            if (target === '#tab-dashboard') {
                this.refreshDashboard();
            }
        });
    },

    refreshDashboard() {
        $('#statCustomers').text(DB.customers.length);
        $('#statItems').text(DB.items.length);
        $('#statOrders').text(DB.orders.length);

        const ctx = document.getElementById('salesChart');
        if (!ctx) return;
        const context = ctx.getContext('2d');

        if (window.salesChart instanceof Chart) {
            window.salesChart.destroy();
        }

        window.salesChart = new Chart(context, {
            type: 'bar',
            data: {
                labels: ['Customers', 'Items', 'Orders'],
                datasets: [{
                    label: 'System Overview',
                    data: [DB.customers.length, DB.items.length, DB.orders.length],
                    backgroundColor: ['#2e77f0', '#34c77a', '#8a49f5']
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    y: { beginAtZero: true }
                }
            }
        });
    }
};

const darkModeToggle = document.getElementById('darkModeToggle');
const body = document.body;


const savedMode = localStorage.getItem('darkMode');
if (savedMode === 'enabled') {
    body.classList.add('dark-mode');
    darkModeToggle.checked = true;
}

darkModeToggle.addEventListener('change', () => {
    if (darkModeToggle.checked) {
        body.classList.add('dark-mode');
        localStorage.setItem('darkMode', 'enabled');
    } else {
        body.classList.remove('dark-mode');
        localStorage.setItem('darkMode', 'disabled');
    }
});