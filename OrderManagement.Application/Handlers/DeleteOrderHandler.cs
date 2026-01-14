using MediatR;
using OrderManagement.Application.Commands;
using OrderManagement.Application.Interfaces;

namespace OrderManagement.Application.Handlers;

public class DeleteOrderHandler : IRequestHandler<DeleteOrderCommand, Unit>
{
    private readonly IOrderWriteRepository _orderRepository;

    public DeleteOrderHandler(IOrderWriteRepository orderRepository)
    {
        _orderRepository = orderRepository;
    }

    public async Task<Unit> Handle(DeleteOrderCommand request, CancellationToken cancellationToken)
    {
        await _orderRepository.DeleteAsync(request.Id);
        return Unit.Value;
    }
}
