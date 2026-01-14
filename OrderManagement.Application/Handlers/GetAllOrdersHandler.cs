using MediatR;
using OrderManagement.Application.DTOs;
using OrderManagement.Application.Interfaces;
using OrderManagement.Application.Queries;

namespace OrderManagement.Application.Handlers;

public class GetAllOrdersHandler : IRequestHandler<GetAllOrdersQuery, List<OrderDto>>
{
    private readonly IOrderReadRepository _orderRepository;

    public GetAllOrdersHandler(IOrderReadRepository orderRepository)
    {
        _orderRepository = orderRepository;
    }

    public async Task<List<OrderDto>> Handle(GetAllOrdersQuery request, CancellationToken cancellationToken)
    {
        return await _orderRepository.GetAllAsync();
    }
}
