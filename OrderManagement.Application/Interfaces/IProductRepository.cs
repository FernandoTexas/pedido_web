using OrderManagement.Domain.Entities;

namespace OrderManagement.Application.Interfaces;

public interface IProductRepository
{
    Task<Product?> GetByIdAsync(Guid id);
    Task<List<Product>> GetAllAsync();
}
