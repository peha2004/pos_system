// controller/AppController.js
const AppController = {
    init() {
        DB.seed();
        this.bindLogin();
        this.autoLoginIfSession();
        $('body').addClass('center-login');
    },
    bindLogin() {
        const loginForm = $('#loginForm');
        const logoutButton = $('#btnLogout');

        loginForm.on('submit', (e) => {
            e.preventDefault();
            const usernameInput = $('#loginUsername').val().trim();
            const passwordInput = $('#loginPassword').val().trim();

            const VALID_USERNAME = 'admin';
            const VALID_PASSWORD = 'password';

            if (usernameInput === VALID_USERNAME && passwordInput === VALID_PASSWORD) {
                Swal.fire({
                    icon: 'success',
                    title: 'Login Successful',
                    text: 'Welcome back to POS System!',
                    showConfirmButton: false,
                    timer: 1500
                }).then(() => {
                    sessionStorage.setItem('pos_user', usernameInput);
                    this.startApp(usernameInput);
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Login Failed',
                    text: 'Invalid username or password. Please try again.',
                });
            }
        });
        logoutButton.on('click', () => {
            Swal.fire({
                title: 'Are you sure?',
                text: "You will be logged out of the system.",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, log me out!'
            }).then((result) => {
                if (result.isConfirmed) {
                    this.showLogin();
                    $('#loginForm')[0].reset();
                    Swal.fire('Logged Out!', 'You have been successfully logged out.', 'success');
                }
            });
        });
    },

    autoLoginIfSession() {
        const user = sessionStorage.getItem('pos_user');
        if (user) this.startApp(user);
    },

    startApp(user) {
        $('#currentUser').text(user);
        $('#view-login').addClass('hidden');
        $('#view-app').removeClass('hidden');

        $('body').removeClass('center-login');

        SectionController.init();
        CustomerController.init();
        ItemController.init();
        OrderController.init();
        SectionController.refreshDashboard();
    },

    showLogin() {
        $('#view-app').addClass('hidden');
        $('#view-login').removeClass('hidden');
        sessionStorage.removeItem('pos_user');
        $('body').addClass('center-login');
    }
};

$(document).ready(() => AppController.init());