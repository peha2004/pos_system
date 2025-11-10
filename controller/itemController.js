// controller/itemController.js
const ItemController = {
    init() {
        this.bindEvents();
        this.loadItems();
    },

    bindEvents() {
        $('#btnAddItem').on('click', () => {
            $('#itemCodeInput, #itemName, #itemPrice, #itemQty').val('');
            new bootstrap.Modal($('#modalItem')).show();
        });

        $('#formItem').on('submit', e => {
            e.preventDefault();
            const code = $('#itemCodeInput').val().trim();
            const name = $('#itemName').val().trim();
            const price = parseFloat($('#itemPrice').val());
            const qty = parseInt($('#itemQty').val());
            if (!code || !name || isNaN(price) || isNaN(qty)) return;

            const existing = DB.items.find(i => i.code === code);
            if (existing) ItemModel.update(code, { name, price, qty });
            else ItemModel.add(new ItemDTO(code, name, price, qty));

            bootstrap.Modal.getInstance($('#modalItem')).hide();
            this.loadItems();
            SectionController.refreshDashboard();
            OrderController.refreshItemDropdown();
        });

        $('#itemsTable').on('click', '.btn-edit-item', e => {
            const code = $(e.currentTarget).data('code');
            const item = DB.items.find(i => i.code === code);
            if (item) {
                $('#itemCodeInput').val(item.code);
                $('#itemName').val(item.name);
                $('#itemPrice').val(item.price);
                $('#itemQty').val(item.qty);
                new bootstrap.Modal($('#modalItem')).show();
            }
        });

        $('#itemsTable').on('click', '.btn-del-item', e => {
            const code = $(e.currentTarget).data('code');
            if (confirm('Delete item ' + code + '?')) {
                ItemModel.delete(code);
                this.loadItems();
                SectionController.refreshDashboard();
                OrderController.refreshItemDropdown();
            }
        });

        $('#itemSearch').on('input', e => {
            const q = e.target.value.toLowerCase();
            const filtered = DB.items.filter(i =>
                i.code.toLowerCase().includes(q) ||
                i.name.toLowerCase().includes(q)
            );
            this.render(filtered);
        });
    },

    loadItems() {
        this.render(ItemModel.getAll());
    },

    render(list) {
        const table = $('#itemsTable');
        table.empty();
        list.forEach(it => {
            table.append(`
                <tr>
                  <td>${it.code}</td>
                  <td>${it.name}</td>
                  <td>${it.price.toFixed(2)}</td>
                  <td>${it.qty}</td>
                  <td>
                    <button class="btn btn-sm btn-primary btn-edit-item" data-code="${it.code}">Edit</button>
                    <button class="btn btn-sm btn-danger btn-del-item" data-code="${it.code}">Delete</button>
                  </td>
                </tr>
            `);
        });
        $('#statItems').text(list.length);
    }
};