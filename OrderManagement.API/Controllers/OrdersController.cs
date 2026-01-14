using MediatR;
using Microsoft.AspNetCore.Mvc;
using OrderManagement.Application.Commands;
using OrderManagement.Application.Queries;
using OrderManagement.Infrastructure.Services;

namespace OrderManagement.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class OrdersController : ControllerBase
{
    private readonly IMediator _mediator;
    private readonly OrderSyncService _syncService;

    public OrdersController(IMediator mediator, OrderSyncService syncService)
    {
        _mediator = mediator;
        _syncService = syncService;
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateOrderCommand command)
    {
        var orderId = await _mediator.Send(command);
        await _syncService.SyncOrderToMongoAsync(orderId);
        return CreatedAtAction(nameof(GetById), new { id = orderId }, orderId);
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var query = new GetAllOrdersQuery();
        var result = await _mediator.Send(query);
        return Ok(result);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var query = new GetOrderByIdQuery { Id = id };
        var result = await _mediator.Send(query);

        if (result == null)
            return NotFound();

        return Ok(result);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(Guid id, [FromBody] UpdateOrderCommand command)
    {
        command.Id = id;
        await _mediator.Send(command);
        await _syncService.SyncOrderToMongoAsync(id);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var command = new DeleteOrderCommand { Id = id };
        await _mediator.Send(command);
        await _syncService.DeleteOrderFromMongoAsync(id);
        return NoContent();
    }
}
