using MediatR;
using OrderManagement.Domain.Enums;

namespace OrderManagement.Application.Commands;

public class UpdateOrderCommand : IRequest<Unit>
{
    public Guid Id { get; set; }
    public OrderStatus Status { get; set; }
}
