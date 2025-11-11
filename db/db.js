const DB = {
    customers: [],
    items: [],
    orders: [],
    nextCustomerId: 1,
    nextItemCode: 4,

    nextCustomerIdGen() {
        return 'C' + (this.nextCustomerId++).toString().padStart(3, '0');
    },
    nextItemCodeGen() {
        return 'I' + (this.nextItemCode++).toString().padStart(3, '0');
    },

    nextOrderIdGen() {
        return 'O' + Date.now();
    },

    seed() {
        this.customers = [
            new CustomerDTO(this.nextCustomerIdGen(), 'Ranuthi', '0771234567', 'Colombo'),
            new CustomerDTO(this.nextCustomerIdGen(), 'Pehansa', '0719876543', 'Kandy')
        ];
        this.items = [
            new ItemDTO('I001', 'Pen', 20.0, 100),
            new ItemDTO('I002', 'Notebook', 150.0, 50),
            new ItemDTO('I003', 'Bottle', 450.0, 20)
        ];
    }
};