import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { OrderService } from '../../services/order.service';
import { Order, OrderStatus, UpdateOrderCommand } from '../../models/order.model';

@Component({
  selector: 'app-order-detail',
  imports: [CommonModule, FormsModule],
  templateUrl: './order-detail.component.html',
  styleUrl: './order-detail.component.css'
})
export class OrderDetailComponent implements OnInit {
  order: Order | null = null;
  loading = false;
  error: string | null = null;
  OrderStatus = OrderStatus;
  selectedStatus: OrderStatus = OrderStatus.Pending;

  statusOptions = [
    { value: OrderStatus.Pending, label: 'Pendente' },
    { value: OrderStatus.Processing, label: 'Processando' },
    { value: OrderStatus.Completed, label: 'Concluído' }
  ];

  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadOrderDetails(id);
    }
  }

  loadOrderDetails(id: string): void {
    this.loading = true;
    this.error = null;
    this.orderService.getOrderById(id).subscribe({
      next: (data) => {
        this.order = data;
        this.selectedStatus = data.status;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Erro ao carregar detalhes do pedido.';
        this.loading = false;
        console.error('Erro:', err);
      }
    });
  }

  updateStatus(): void {
    if (!this.order) return;

    const command: UpdateOrderCommand = {
      status: Number(this.selectedStatus)
    };

    this.orderService.updateOrder(this.order.id, command).subscribe({
      next: () => {
        alert('Status atualizado com sucesso!');
        if (this.order) {
          this.order.status = this.selectedStatus;
        }
      },
      error: (err) => {
        alert('Erro ao atualizar status.');
        console.error('Erro:', err);
      }
    });
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

  goBack(): void {
    this.router.navigate(['/orders']);
  }
}
