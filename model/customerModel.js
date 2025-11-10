// customerModel.js
const CustomerModel = {
    getAll() {
        return DB.customers;
    },
    add(data) {
        data.id = DB.nextCustomerIdGen();
        DB.customers.push(data);
    },
    update(id, data) {
        const i = DB.customers.findIndex(c => c.id === id);
        if (i > -1) DB.customers[i] = { ...DB.customers[i], ...data };
    },
    delete(id) {
        DB.customers = DB.customers.filter(c => c.id !== id);
    }
};