import ShopItem from '@/model/shop/ShopItem'

interface ICart {
    id: number;
    items: ShopItem[];
}

export default class Cart {
    public id: number;
    public items: ShopItem[];

    public constructor(cart?: ICart) {
        this.id = cart?.id ?? 0;
        this.items = cart?.items ?? [];
    }
}