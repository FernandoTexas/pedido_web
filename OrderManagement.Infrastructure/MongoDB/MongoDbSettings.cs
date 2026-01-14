namespace OrderManagement.Infrastructure.MongoDB;

public class MongoDbSettings
{
    public string ConnectionString { get; set; } = "mongodb://localhost:27017";
    public string DatabaseName { get; set; } = "OrderManagementDb";
    public string OrdersCollectionName { get; set; } = "Orders";
}
