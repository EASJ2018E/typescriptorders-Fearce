export class htmlbuilder {
   public CreateHtmlList(elementId: string, value: number, orderId: number) {
        const node = document.createElement("li");
        node.appendChild(document.createTextNode(`SalesOrderId: ${orderId}, Value: ${value}`));
        document.getElementById(elementId).append(node);
    }
}
