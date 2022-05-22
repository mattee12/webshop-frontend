interface IUser {
    id: number;
    email: string;
    role: string;
}
export default class User {
    public id: number;
    public email: string;
    public role: string;

    public constructor(user?: IUser) {
        this.id = user?.id ?? 0;
        this.email = user?.email ?? '';
        this.role = user?.role ?? '';
    }
}