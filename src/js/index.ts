import { IOrderline } from "./interface";
import { Orderline } from "./Orderline";
import { Order } from "./Order";
import { htmlbuilder } from "./htmlbuilder";

const uri:string = "https://localhost:44365/api/orderlines/";
var orderLines:Orderline[]= new Array<Orderline>();
var i:number = 0;

function CreateHtmlList(elementId:string, value:number, orderId:number)
{
    const node = document.createElement("li");
    node.appendChild(document.createTextNode(`SalesOrderId: ${orderId}, Value: ${value}`));
    document.getElementById(elementId).append(node);
}

function GetAllOrderlines(): void {
    const uriRequest: Request = new Request(uri);
    fetch(uriRequest).then((response) => {
        return response.json();
    }).then((myJson) => {
        const ol: Orderline[] = myJson;
        orderLines = new Array<Orderline>();
        ol.forEach((element) => { // Skal være new Orderline, ikke json data (for at metoderne virker)
            let ol = new Orderline(element.salesOrderId, element.orderQty, element.productId, element.unitPrice, element.unitPriceDiscount);
            orderLines.push(ol)
            const node = document.createElement("li");
            node.appendChild(document.createTextNode(`salesOrderId: ${element.salesOrderId}, orderQty:
            ${element.orderQty}, productId: ${element.productId}, unitPrice: ${element.unitPrice}, unitPriceDiscount: ${element.unitPriceDiscount}`));
            document.getElementById("orderlinesList").append(node);
        });
    });
}

var getAllButton = document.getElementById("getAllOrderlines") as HTMLButtonElement;
var sumButton = document.getElementById("beregnSum") as HTMLButtonElement;
var momsButton = document.getElementById("beregnMoms") as HTMLButtonElement;
var totalButton = document.getElementById("beregnTotal") as HTMLButtonElement;
const orderTotalButton = document.getElementById("orderTotal") as HTMLButtonElement;

orderTotalButton.addEventListener("click", () => {
    const order = new Order(1,orderLines);
    CreateHtmlList("ordertotalul",order.SumTotal(),order.OrderId);
});

getAllButton.addEventListener("click", () => {
    document.getElementById("orderlinesList").innerHTML = "";
    GetAllOrderlines();
});

sumButton.addEventListener("click" , () => {
    orderLines.forEach(element => {
        CreateHtmlList("sumul",element.BeregnSum(),element.salesOrderId);
    });
});

momsButton.addEventListener("click" , () => {
    orderLines.forEach(element => {
        CreateHtmlList("momsul",element.Moms(),element.salesOrderId);
    });
});

totalButton.addEventListener("click" , () => {
    orderLines.forEach(element => {
        CreateHtmlList("totalul",element.Total(),element.salesOrderId);
    });
});


GetAllOrderlines();