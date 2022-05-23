interface IShopItem {
    name?: string,
    price?: number,
    description?: string,
    id?: number,
}

export default class ShopItem {
    public name?: string;
    public price?: number;
    public description?: string;
    public id?: number;

    constructor(item?: IShopItem) {
        this.name = item?.name;
        this.price = item?.price;
        this.description = item?.description;
        this.id = item?.id;
    }
}