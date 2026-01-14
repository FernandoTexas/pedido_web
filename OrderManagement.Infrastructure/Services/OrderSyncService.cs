using Microsoft.EntityFrameworkCore;
using MongoDB.Driver;
using OrderManagement.Application.DTOs;
using OrderManagement.Infrastructure.Data;
using OrderManagement.Infrastructure.MongoDB;

namespace OrderManagement.Infrastructure.Services;

public class OrderSyncService
{
    private readonly ApplicationDbContext _sqlContext;
    private readonly IMongoCollection<OrderDto> _mongoOrders;

    public OrderSyncService(ApplicationDbContext sqlContext, MongoDbSettings mongoSettings)
    {
        _sqlContext = sqlContext;
        var client = new MongoClient(mongoSettings.ConnectionString);
        var database = client.GetDatabase(mongoSettings.DatabaseName);
        _mongoOrders = database.GetCollection<OrderDto>(mongoSettings.OrdersCollectionName);
    }

    public async Task SyncOrderToMongoAsync(Guid orderId)
    {
        var order = await _sqlContext.Orders
            .Include(o => o.Customer)
            .Include(o => o.OrderItems)
            .FirstOrDefaultAsync(o => o.Id == orderId);

        if (order == null) return;

        var orderDto = new OrderDto
        {
            Id = order.Id,
            CustomerId = order.CustomerId,
            CustomerName = order.Customer.Name,
            OrderDate = order.OrderDate,
            TotalAmount = order.TotalAmount,
            Status = order.Status,
            Items = order.OrderItems.Select(oi => new OrderItemDto
            {
                Id = oi.Id,
                ProductId = oi.ProductId,
                ProductName = oi.ProductName,
                Quantity = oi.Quantity,
                UnitPrice = oi.UnitPrice,
                TotalPrice = oi.TotalPrice
            }).ToList()
        };

        await _mongoOrders.ReplaceOneAsync(
            o => o.Id == orderId,
            orderDto,
            new ReplaceOptions { IsUpsert = true }
        );
    }

    public async Task DeleteOrderFromMongoAsync(Guid orderId)
    {
        await _mongoOrders.DeleteOneAsync(o => o.Id == orderId);
    }
}
