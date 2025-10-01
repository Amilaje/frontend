export type CarResponse = {
    brand:string;
    model:string;
    color:string;
    registration:string;
    modelYear:number;
    price:number;
    _links:{
        self:{
            href:string;
        },
        profile:{
            href:string;
        },
        search:{
            href:string;
        }
    }
}

export type Car ={
    brand:string;
    model:string;
    color:string;
    registration:string;
    modelYear:number;
    price:number;
}

export type CarEntry = {
    car : Car;
    url : string;
}