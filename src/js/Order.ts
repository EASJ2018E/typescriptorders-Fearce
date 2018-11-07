import { Orderline } from "./Orderline";

export class Order{

    Orderlist: Array<Orderline>;
    OrderId: number;

    constructor(orderId:number, array:Array<Orderline>)
    {
        this.Orderlist = array;
        this.OrderId = orderId;
    }

    SumTotal():number{
        let total:number = 0; // Fixed NaN by initializing as 0
        this.Orderlist.forEach((element) => {
            total+=element.Total();
        });
        return total;
    }

}