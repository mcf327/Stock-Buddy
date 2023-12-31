const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const itemSchema = require('./itemSchema');

const inventoryItemSchema = new Schema({
    qty: { type: Number, default: 0 },
    minimumStock: { type: Number, default: 0 },
    item: itemSchema
}, {
    timestamps: true,
    toJSON: { virtuals: true }
});

const inventorySchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    inventoryItems: [inventoryItemSchema],
}, {
    timestamps: true,
    toJSON: { virtuals: true }
});

inventorySchema.statics.getInventory = function(userId) {
    return this.findOneAndUpdate(
        { user: userId },
        { user: userId },
        { upsert: true, new: true }
    );
}

inventorySchema.methods.addItemToInventory = async function(itemId) {
    const inventory = this;
    const inventoryItem = inventory.inventoryItems.find(inventoryItem => inventoryItem.item._id.equals(itemId));
    if (inventoryItem) {
      return;
    } else {
      const Item = mongoose.model('Item');
      const item = await Item.findById(itemId);
      inventory.inventoryItems.push({ item });
    }
    return inventory.save();
};

inventorySchema.methods.removeItemFromInventory = async function(itemId) {
    const inventory = this;
    const itemIndex = inventory.inventoryItems.findIndex(inventoryItem =>
        inventoryItem.item._id.equals(itemId)
    );
    if (itemIndex !== -1) {
    inventory.inventoryItems.splice(itemIndex, 1);
    await inventory.save();
    }
    return inventory;
}

inventorySchema.methods.setItemQty = async function(itemId, newQty) {
    const inventory = this;
    const inventoryItem = inventory.inventoryItems.find(inventoryItem => inventoryItem.item._id.equals(itemId));
    inventoryItem.qty = newQty;
    return inventory.save();
}

inventorySchema.methods.setItemMin = async function(itemId, newMin) {
    const inventory = this;
    const inventoryItem = inventory.inventoryItems.find(inventoryItem => inventoryItem.item._id.equals(itemId));
    inventoryItem.minimumStock = newMin;
    return inventory.save();
}


module.exports = mongoose.model('Inventory', inventorySchema);