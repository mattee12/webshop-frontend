interface IFormItemAddErrors {
    name: string;
    price: string;
    description: string;
}

export default class FormItemAddErrors {
    public name: string;
    public price: string;
    public description: string;

    public constructor(arg?: IFormItemAddErrors){
        this.name = arg?.name ?? '';
        this.price = arg?.price ?? '';
        this.description = arg?.description ?? '';
    }
}