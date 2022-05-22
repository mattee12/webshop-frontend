interface IFormErrors {
    email: string;
    password: string;
}

export default class FormErrors {
    public email: string;
    public password: string;

    constructor(errors?: IFormErrors) {
        this.email = errors?.email ?? '';
        this.password = errors?.password ?? '';
    }
}