// orderModel.js
const OrderModel = {
    getAll() {
        return DB.orders;
    },
    add(order) {
        order.id = DB.nextOrderIdGen();
        DB.orders.push(order);
    }
};