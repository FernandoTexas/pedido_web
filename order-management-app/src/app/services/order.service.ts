import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order, CreateOrderCommand, UpdateOrderCommand } from '../models/order.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = `${environment.apiUrl}/Orders`;

  constructor(private http: HttpClient) { }

  // Listar todos os pedidos
  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.apiUrl);
  }

  // Detalhar um pedido específico
  getOrderById(id: string): Observable<Order> {
    return this.http.get<Order>(`${this.apiUrl}/${id}`);
  }

  // Adicionar novo pedido
  createOrder(command: CreateOrderCommand): Observable<any> {
    return this.http.post(this.apiUrl, command);
  }

  // Atualizar status do pedido
  updateOrder(id: string, command: UpdateOrderCommand): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, command);
  }

  // Remover pedido
  deleteOrder(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
