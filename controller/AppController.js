// controller/AppController.js
const AppController = {
    init() {
        DB.seed();
        this.bindLogin();
        this.autoLoginIfSession();
    },
    bindLogin() {
        $('#loginForm').on('submit', (e) => {
            e.preventDefault();
            const user = $('#loginUsername').val().trim();
            const pass = $('#loginPassword').val().trim();
            if (user === 'admin' && pass === 'password') {
                sessionStorage.setItem('pos_user', user);
                this.startApp(user);
            } else {
                alert('Invalid credentials');
            }
        });

        $('#btnLogout').on('click', () => {
            sessionStorage.removeItem('pos_user');
            location.reload();
        });
    },

    autoLoginIfSession() {
        const u = sessionStorage.getItem('pos_user');
        if (u) this.startApp(u);
    },

    startApp(user) {
        $('#currentUser').text(user);
        $('#view-login').addClass('hidden');
        $('#view-app').removeClass('hidden');

        SectionController.init();
        CustomerController.init();
        ItemController.init();
        OrderController.init();
        SectionController.refreshDashboard();
    }
};

$(document).ready(() => AppController.init());