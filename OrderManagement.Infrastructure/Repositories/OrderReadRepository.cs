using MongoDB.Driver;
using OrderManagement.Application.DTOs;
using OrderManagement.Application.Interfaces;
using OrderManagement.Infrastructure.MongoDB;

namespace OrderManagement.Infrastructure.Repositories;

public class OrderReadRepository : IOrderReadRepository
{
    private readonly IMongoCollection<OrderDto> _orders;

    public OrderReadRepository(MongoDbSettings settings)
    {
        var client = new MongoClient(settings.ConnectionString);
        var database = client.GetDatabase(settings.DatabaseName);
        _orders = database.GetCollection<OrderDto>(settings.OrdersCollectionName);
    }

    public async Task<List<OrderDto>> GetAllAsync()
    {
        return await _orders.Find(_ => true).ToListAsync();
    }

    public async Task<OrderDto?> GetByIdAsync(Guid id)
    {
        return await _orders.Find(o => o.Id == id).FirstOrDefaultAsync();
    }
}
