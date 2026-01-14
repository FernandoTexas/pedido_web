import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { ProductService } from '../../services/product.service';
import { CreateOrderCommand, OrderItemCommand, Product } from '../../models/order.model';

@Component({
  selector: 'app-order-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './order-form.component.html',
  styleUrl: './order-form.component.css'
})
export class OrderFormComponent implements OnInit {
  customerId: string = 'CFDFB7DB-8AB7-4425-A4A6-96116C396530'; // ID fixo para aprendizado
  products: Product[] = [];
  orderItems: OrderItemCommand[] = [];
  loading = false;
  error: string | null = null;

  newItem: OrderItemCommand = {
    productId: '',
    quantity: 1
  };

  constructor(
    private orderService: OrderService,
    private productService: ProductService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (err) => {
        console.error('Erro ao carregar produtos:', err);
      }
    });
  }

  addItem(): void {
    if (!this.newItem.productId || this.newItem.quantity <= 0) {
      alert('Por favor, selecione um produto e informe uma quantidade válida.');
      return;
    }

    this.orderItems.push({ ...this.newItem });
    this.newItem = { productId: '', quantity: 1 };
  }

  removeItem(index: number): void {
    this.orderItems.splice(index, 1);
  }

  getProductName(productId: string): string {
    const product = this.products.find(p => p.id === productId);
    return product ? product.name : 'Produto desconhecido';
  }

  createOrder(): void {
    if (!this.customerId) {
      alert('Por favor, informe o ID do cliente.');
      return;
    }

    if (this.orderItems.length === 0) {
      alert('Por favor, adicione pelo menos um item ao pedido.');
      return;
    }

    const command: CreateOrderCommand = {
      customerId: this.customerId,
      items: this.orderItems
    };

    this.loading = true;
    this.error = null;

    this.orderService.createOrder(command).subscribe({
      next: () => {
        alert('Pedido criado com sucesso!');
        this.router.navigate(['/orders']);
      },
      error: (err) => {
        this.error = 'Erro ao criar pedido. Verifique os dados e tente novamente.';
        this.loading = false;
        console.error('Erro:', err);
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/orders']);
  }
}
