export class Order {
    id?: number;
    productName?: string;
    quantity?: number;
    pricePerUnit?: number;
    currency?: string;
    pickupLocation?: string;
    destination?: string;
    orderDate?: Date;
    dueDate?: Date;
    // orderDate?: string;
    // dueDate?: string;
    status: string = 'Czeka na odbiór';
    supplierId?: number;
    userId?: number;
}
