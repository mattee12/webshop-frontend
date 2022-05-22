interface IAuth {
    email?: string,
    password?: string,
    token?: string,
}

export default class Auth {
    public email?: string;
    public password?: string;
    public token?: string;

    public constructor(auth?: IAuth) {
        this.email = auth?.email;
        this.password = auth?.password;
        this.token = auth?.token;
    }
}