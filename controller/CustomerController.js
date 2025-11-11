const CustomerController = {
    init() {
        this.bindEvents();
        this.refresh();
    },

    bindEvents() {
        $('#btnAddCustomer').on('click', () => {
            $('#custId').val('');
            $('#custName, #custContact, #custAddress').val('');
            new bootstrap.Modal($('#modalCustomer')).show();
        });
        $('#formCustomer').on('submit', e => {
            e.preventDefault();

            const id = $('#custId').val();
            const name = $('#custName').val().trim();
            const contact = $('#custContact').val().trim();
            const address = $('#custAddress').val().trim();

            if (!name) {
                alert('Please enter a name.');
                return;
            }
            if (!/^[0-9]{10}$/.test(contact)) {
                alert('Please enter a valid 10-digit phone number (numbers only).');
                return;
            }
            if (!address) {
                alert('Please enter an address.');
                return;
            }

            if (id) CustomerModel.update(id, { name, contact, address });
            else CustomerModel.add({ name, contact, address });

            bootstrap.Modal.getInstance($('#modalCustomer')).hide();
            this.refresh();

            if (typeof OrderController !== 'undefined') {
                OrderController.refreshCustomerDropdown();
            }
        });
        $('#customersTable').on('click', '.btn-edit-cust', e => {
            const id = $(e.currentTarget).data('id');
            const c = CustomerModel.getAll().find(x => x.id === id);
            if (c) {
                $('#custId').val(c.id);
                $('#custName').val(c.name);
                $('#custContact').val(c.contact);
                $('#custAddress').val(c.address);
                new bootstrap.Modal($('#modalCustomer')).show();
            }
        });
        $('#customersTable').on('click', '.btn-del-cust', e => {
            const id = $(e.currentTarget).data('id');
            if (confirm('Delete customer ' + id + '?')) {
                CustomerModel.delete(id);
                this.refresh();
            }
        });
        $('#custSearch').on('input', e => {
            const q = e.target.value.toLowerCase();
            const filtered = CustomerModel.getAll().filter(
                c =>
                    c.name.toLowerCase().includes(q) ||
                    c.contact.toLowerCase().includes(q) ||
                    c.id.toLowerCase().includes(q)
            );
            this.render(filtered);
        });
        $('#custContact').on('input', e => {
            e.target.value = e.target.value.replace(/\D/g, '').slice(0, 10);
        });
    },

    refresh() {
        this.render(CustomerModel.getAll());
    },
    render(list) {
        const table = $('#customersTable');
        table.empty();
        list.forEach(c => {
            table.append(`
                <tr>
                  <td>${c.id}</td>
                  <td>${c.name}</td>
                  <td>${c.contact}</td>
                  <td>${c.address}</td>
                  <td>
                    <button class="btn btn-sm btn-primary btn-edit-cust" data-id="${c.id}">Edit</button>
                    <button class="btn btn-sm btn-danger btn-del-cust" data-id="${c.id}">Delete</button>
                  </td>
                </tr>
            `);
        });
        $('#statCustomers').text(list.length);
    }
};
