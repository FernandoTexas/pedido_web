import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { Order, OrderStatus } from '../../models/order.model';

@Component({
  selector: 'app-order-list',
  imports: [CommonModule, RouterModule],
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.css'
})
export class OrderListComponent implements OnInit {
  orders: Order[] = [];
  loading = false;
  error: string | null = null;
  OrderStatus = OrderStatus; // Expor o enum para o template

  constructor(
    private orderService: OrderService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.loading = true;
    this.error = null;
    this.orderService.getOrders().subscribe({
      next: (data) => {
        this.orders = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Erro ao carregar pedidos. Verifique se a API está rodando.';
        this.loading = false;
        console.error('Erro:', err);
      }
    });
  }

  viewDetails(orderId: string): void {
    this.router.navigate(['/orders', orderId]);
  }

  deleteOrder(orderId: string): void {
    if (confirm('Tem certeza que deseja remover este pedido?')) {
      this.orderService.deleteOrder(orderId).subscribe({
        next: () => {
          alert('Pedido removido com sucesso!');
          this.loadOrders(); // Recarregar a lista
        },
        error: (err) => {
          alert('Erro ao remover pedido.');
          console.error('Erro:', err);
        }
      });
    }
  }

  getStatusText(status: OrderStatus): string {
    switch (status) {
      case OrderStatus.Pending:
        return 'Pendente';
      case OrderStatus.Processing:
        return 'Processando';
      case OrderStatus.Completed:
        return 'Concluído';
      default:
        return 'Desconhecido';
    }
  }

  getStatusClass(status: OrderStatus): string {
    switch (status) {
      case OrderStatus.Pending:
        return 'status-pending';
      case OrderStatus.Processing:
        return 'status-processing';
      case OrderStatus.Completed:
        return 'status-completed';
      default:
        return '';
    }
  }
}
