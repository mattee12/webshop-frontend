import User from '@/model/user/User';
import FormAuthErrors from './FormAuthErrors';

export default class ResponseAuth {
    private user?: User;
    private errors?: FormAuthErrors;
    
    public getUser(): User | undefined {
        return this.user;
    }

    public setUser(user: User): void {
        this.user = user;
    }

    public getErrors(): FormAuthErrors{
        return this.errors ?? new FormAuthErrors();
    }

    public setErrors(errors: FormAuthErrors = new FormAuthErrors()): void {
        this.errors = errors;
    }

    public isSuccessful = () => !!this.user;
}
