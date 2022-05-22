interface IShopItem {
    name?: string,
    price?: number,
    description?: string,
}

export default class ShopItem {
    public name?: string;
    public price?: number;
    public description?: string;

    constructor(item?: IShopItem) {
        this.name = item?.name;
        this.price = item?.price;
        this.description = item?.description;
    }
}