using MediatR;

namespace OrderManagement.Application.Commands;

public class DeleteOrderCommand : IRequest<Unit>
{
    public Guid Id { get; set; }
}
