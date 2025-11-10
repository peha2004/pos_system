// controller/sectionController.js
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