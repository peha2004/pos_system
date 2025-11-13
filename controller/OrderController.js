// controller/OrderController.js
const OrderController = {
    cart: [],

    init() {
        this.bindEvents();
        this.loadOrders();
        this.refreshCustomerDropdown();
        this.refreshItemDropdown();
    },

    bindEvents() {
        $('#btnAddToCart'). on('click', () => {
            const code = $('#orderItem').val();
            const qty = parseInt($('#orderQty').val());
            if (!code || qty < 1) return alert('Invalid selection');

            const item = DB.items.find(i => i.code === code);
            if (!item || item.qty < qty) return alert('Not enough stock');

            const existing = this.cart.find(c => c.code === code);
            if (existing) {
                alert('This item is already in the cart!');
                return;
            }
            this.cart.push({ code: item.code, name: item.name, qty, unit: item.price });
            this.renderCart();
        });

        $('#cartTable').on('click', '.btn-del-cart', e => {
            const index = $(e.currentTarget).data('index');
            this.cart.splice(index, 1);
            this.renderCart();
        });

        $('#btnPlaceOrder').on('click', () => {
            const custId = $('#orderCustomer').val();
            if (!custId) return alert('Select a customer!');
            if (this.cart.length === 0) return alert('Cart empty!');

            const customer = DB.customers.find(c => c.id === custId);
            const total = this.cart.reduce((sum, i) => sum + i.qty * i.unit, 0);

            this.cart.forEach(ci => {
                const item = DB.items.find(i => i.code === ci.code);
                item.qty -= ci.qty;
            });

            const order = new OrderDTO(null, new Date().toLocaleString(), customer.name, [...this.cart], total);
            OrderModel.add(order);

            this.cart = [];
            this.renderCart();
            this.loadOrders();
            SectionController.refreshDashboard();
            ItemController.loadItems();
            alert('Order placed successfully!');
        });
    },

    renderCart() {
        const tbody = $('#cartTable');
        tbody.empty();
        let total = 0;
        this.cart.forEach((ci, idx) => {
            const sub = ci.qty * ci.unit;
            total += sub;
            tbody.append(`
                <tr>
                  <td>${ci.name}</td>
                  <td>${ci.qty}</td>
                  <td>${ci.unit.toFixed(2)}</td>
                  <td>${sub.toFixed(2)}</td>
                  <td><button class="btn btn-sm btn-danger btn-del-cart" data-index="${idx}">X</button></td>
                </tr>
            `);
        });
        $('#orderTotal').text(total.toFixed(2));
    },

    loadOrders() {
        const orders = OrderModel.getAll();
        const tbody = $('#ordersTable');
        tbody.empty();

        orders.forEach(o => {
            const itemSummary = o.items.map(i => `${i.name}(${i.qty})`).join(', ');
            tbody.append(`
            <tr>
                <td>${o.id}</td>
                <td>${o.date}</td>
                <td>${o.customer}</td>
                <td>${itemSummary}</td>
                <td>${o.total.toFixed(2)}</td>
            </tr>
        `);
        });

        $('#statOrders').text(orders.length);
    },

    refreshCustomerDropdown() {
        const sel = $('#orderCustomer');
        sel.empty().append(`<option value="">Select Customer</option>`);
        DB.customers.forEach(c => {
            sel.append(`<option value="${c.id}">${c.id} - ${c.name}</option>`);
        });
    },

    refreshItemDropdown() {
        const sel = $('#orderItem');
        sel.empty().append(`<option value="">Select Item</option>`);
        DB.items.forEach(i => {
            sel.append(`<option value="${i.code}">${i.code} - ${i.name}</option>`);
        });
    }
};