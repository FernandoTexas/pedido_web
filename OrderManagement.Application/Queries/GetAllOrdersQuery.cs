using MediatR;
using OrderManagement.Application.DTOs;

namespace OrderManagement.Application.Queries;

public class GetAllOrdersQuery : IRequest<List<OrderDto>>
{
}
