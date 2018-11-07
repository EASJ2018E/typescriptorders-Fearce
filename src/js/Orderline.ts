import { IOrderline } from "./interface";

export class Orderline implements IOrderline{

    salesOrderId: number;
    orderQty: number;
    productId: number;
    unitPrice: number;
    unitPriceDiscount: number;

    constructor(salesOrderId:number,orderQty:number, productId: number,unitPrice: number,unitPriceDiscount:number){
        this.salesOrderId = salesOrderId;
        this.orderQty = orderQty;
        this.productId = productId;
        this.unitPrice = unitPrice;
        this.unitPriceDiscount = unitPriceDiscount;
    }

    BeregnSum():number {
        return this.orderQty * (this.unitPrice-this.unitPriceDiscount);
    }

    public Moms():number{
        return this.BeregnSum()*0.25;
    }

    public Total():number{
        return this.BeregnSum()+this.Moms();
    }

}