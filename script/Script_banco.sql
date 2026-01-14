USE OrderManagementDb;
GO

-- 1. Remover todas as tabelas (incluindo histórico)
DROP TABLE IF EXISTS OrderItems;
DROP TABLE IF EXISTS Orders;
DROP TABLE IF EXISTS Products;
DROP TABLE IF EXISTS Customers;
DROP TABLE IF EXISTS __EFMigrationsHistory;
GO

-- 2. Criar tabela Customers
CREATE TABLE Customers (
    Id UNIQUEIDENTIFIER NOT NULL PRIMARY KEY,
    Name NVARCHAR(200) NOT NULL,
    Email NVARCHAR(200) NOT NULL,
    Phone NVARCHAR(20) NULL
);

-- 3. Criar tabela Products
CREATE TABLE Products (
    Id UNIQUEIDENTIFIER NOT NULL PRIMARY KEY,
    Name NVARCHAR(200) NOT NULL,
    Price DECIMAL(18,2) NOT NULL
);

-- 4. Criar tabela Orders
CREATE TABLE Orders (
    Id UNIQUEIDENTIFIER NOT NULL PRIMARY KEY,
    CustomerId UNIQUEIDENTIFIER NOT NULL,
    OrderDate DATETIME2 NOT NULL,
    TotalAmount DECIMAL(18,2) NOT NULL,
    Status INT NOT NULL,
    CONSTRAINT FK_Orders_Customers FOREIGN KEY (CustomerId) REFERENCES Customers(Id)
);

-- 5. Criar tabela OrderItems
CREATE TABLE OrderItems (
    Id UNIQUEIDENTIFIER NOT NULL PRIMARY KEY,
    OrderId UNIQUEIDENTIFIER NOT NULL,
    ProductId UNIQUEIDENTIFIER NOT NULL,
    ProductName NVARCHAR(200) NOT NULL,
    Quantity INT NOT NULL,
    UnitPrice DECIMAL(18,2) NOT NULL,
    TotalPrice DECIMAL(18,2) NOT NULL,
    CONSTRAINT FK_OrderItems_Orders FOREIGN KEY (OrderId) REFERENCES Orders(Id) ON DELETE CASCADE
);
GO

-- 6. Criar tabela de histórico do EF Core
CREATE TABLE __EFMigrationsHistory (
    MigrationId NVARCHAR(150) NOT NULL PRIMARY KEY,
    ProductVersion NVARCHAR(32) NOT NULL
);
GO

-- 7. Inserir dados iniciais (seeds)
DECLARE @CustomerId UNIQUEIDENTIFIER = NEWID();
DECLARE @Product1Id UNIQUEIDENTIFIER = NEWID();
DECLARE @Product2Id UNIQUEIDENTIFIER = NEWID();
DECLARE @Product3Id UNIQUEIDENTIFIER = NEWID();

-- Cliente padrão
INSERT INTO Customers (Id, Name, Email, Phone)
VALUES (@CustomerId, N'Cliente Padrão', N'cliente@email.com', N'11999999999');

-- 3 Produtos
INSERT INTO Products (Id, Name, Price) VALUES
(@Product1Id, N'Produto A', 100.00),
(@Product2Id, N'Produto B', 250.00),
(@Product3Id, N'Produto C', 75.50);

-- Registrar migration como aplicada
INSERT INTO __EFMigrationsHistory (MigrationId, ProductVersion)
VALUES (N'20260113222905_InitialCreate', N'8.0.0');
GO

-- 8. VERIFICAÇÃO - Mostrar o que foi criado
PRINT '========================================';
PRINT 'TABELAS CRIADAS:';
PRINT '========================================';
SELECT TABLE_NAME 
FROM INFORMATION_SCHEMA.TABLES 
WHERE TABLE_TYPE = 'BASE TABLE'
ORDER BY TABLE_NAME;

PRINT '';
PRINT '========================================';
PRINT 'CONTAGEM DE DADOS:';
PRINT '========================================';
SELECT 'Customers' as Tabela, COUNT(*) as Total FROM Customers
UNION ALL
SELECT 'Products', COUNT(*) FROM Products
UNION ALL
SELECT 'Orders', COUNT(*) FROM Orders
UNION ALL
SELECT 'OrderItems', COUNT(*) FROM OrderItems;

PRINT '';
PRINT '========================================';
PRINT 'CLIENTE CADASTRADO:';
PRINT '========================================';
SELECT * FROM Customers;

PRINT '';
PRINT '========================================';
PRINT 'PRODUTOS CADASTRADOS:';
PRINT '========================================';
SELECT * FROM Products;

PRINT '';
PRINT '========================================';
PRINT 'SUCESSO! Banco de dados configurado!';
PRINT '========================================';
GO