// CustomerModel.js
const CustomerModel = {
    getAll() {
        return DB.customers;
    },
    add(customerDTO) {
        if (!customerDTO.id) {
            customerDTO.id = DB.nextCustomerIdGen();
        }
        DB.customers.push(customerDTO);
    },

    update(id, customerDTO) {
        const i = DB.customers.findIndex(c => c.id === id);
        if (i > -1) DB.customers[i] = customerDTO;
    },
    delete(id) {
        DB.customers = DB.customers.filter(c => c.id !== id);
    }
};