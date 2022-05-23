interface IFormAuthErrors {
    email: string;
    password: string;
}

export default class FormAuthErrors {
    public email: string;
    public password: string;

    constructor(errors?: IFormAuthErrors) {
        this.email = errors?.email ?? '';
        this.password = errors?.password ?? '';
    }
}