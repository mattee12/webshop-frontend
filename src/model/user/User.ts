import Cart from '@/model/user/Cart'

interface IUser {
    id: number;
    email: string;
    role: string;
    cart: Cart;
}
export default class User {
    public id: number;
    public email: string;
    public role: string;
    public cart: Cart;

    public constructor(user?: IUser) {
        this.id = user?.id ?? 0;
        this.email = user?.email ?? '';
        this.role = user?.role ?? '';
        this.cart = user?.cart ?? new Cart();
    }
}