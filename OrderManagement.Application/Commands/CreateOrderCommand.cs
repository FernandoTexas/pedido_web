using MediatR;

namespace OrderManagement.Application.Commands;

public class CreateOrderCommand : IRequest<Guid>
{
    public Guid CustomerId { get; set; }
    public List<OrderItemCommand> Items { get; set; } = new();
}

public class OrderItemCommand
{
    public Guid ProductId { get; set; }
    public int Quantity { get; set; }
}
