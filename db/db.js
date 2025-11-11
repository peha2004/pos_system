const DB = {
    customers: [],
    items: [],
    orders: [],
    nextCustomerId: 1,

    nextCustomerIdGen() {
        return 'C' + (this.nextCustomerId++).toString().padStart(3, '0');
    },
    nextOrderIdGen() {
        return 'O' + Date.now();
    },

    seed() {
        this.customers = [
            { id: this.nextCustomerIdGen(), name: 'Ranuthi', contact: '0771234567', address: 'Colombo' },
            { id: this.nextCustomerIdGen(), name: 'Pehansa', contact: '0719876543', address: 'Kandy' }
        ];
        this.items = [
            { code: 'I001', name: 'Pen', price: 20.0, qty: 100 },
            { code: 'I002', name: 'Notebook', price: 150.0, qty: 50 },
            { code: 'I003', name: 'Bottle', price: 450.0, qty: 20 }
        ];
    }
};