// ItemModel.js
const ItemModel = {
    getAll() {
        return DB.items;
    },
    add(item) {
        DB.items.push(item);
    },
    update(code, data) {
        const i = DB.items.findIndex(it => it.code === code);
        if (i > -1) DB.items[i] = { ...DB.items[i], ...data };
    },
    delete(code) {
        DB.items = DB.items.filter(it => it.code !== code);
    }
};