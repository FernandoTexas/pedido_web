export interface OrderItemCommand {
  productId: string;
  quantity: number;
}

export interface CreateOrderCommand {
  customerId: string;
  items: OrderItemCommand[];
}

export enum OrderStatus {
  Pending = 1,
  Processing = 2,
  Completed = 3
}

export interface UpdateOrderCommand {
  status: OrderStatus;
}

export interface Order {
  id: string;
  customerId: string;
  status: OrderStatus;
  items: OrderItem[];
  createdAt?: Date;
  totalAmount?: number;
}

export interface OrderItem {
  productId: string;
  productName?: string;
  quantity: number;
  unitPrice?: number;
  totalPrice?: number;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  description?: string;
}
