using MediatR;
using OrderManagement.Application.Commands;
using OrderManagement.Application.Interfaces;

namespace OrderManagement.Application.Handlers;

public class UpdateOrderHandler : IRequestHandler<UpdateOrderCommand, Unit>
{
    private readonly IOrderWriteRepository _orderRepository;

    public UpdateOrderHandler(IOrderWriteRepository orderRepository)
    {
        _orderRepository = orderRepository;
    }

    public async Task<Unit> Handle(UpdateOrderCommand request, CancellationToken cancellationToken)
    {
        var order = await _orderRepository.GetByIdAsync(request.Id);
        if (order == null)
            throw new Exception($"Pedido {request.Id} não encontrado");

        order.Status = request.Status;

        await _orderRepository.UpdateAsync(order);

        return Unit.Value;
    }
}
