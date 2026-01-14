using OrderManagement.Domain.Entities;

namespace OrderManagement.Application.Interfaces;

public interface IOrderWriteRepository
{
    Task<Order> AddAsync(Order order);
    Task UpdateAsync(Order order);
    Task DeleteAsync(Guid id);
    Task<Order?> GetByIdAsync(Guid id);
}
