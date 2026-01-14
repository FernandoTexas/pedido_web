using OrderManagement.Application.DTOs;

namespace OrderManagement.Application.Interfaces;

public interface IOrderReadRepository
{
    Task<List<OrderDto>> GetAllAsync();
    Task<OrderDto?> GetByIdAsync(Guid id);
}
