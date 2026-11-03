
using Microsoft.AspNetCore.Mvc;
using Vertice.Domain.Entities;
using Vertice.Domain.Services;

namespace Vertice.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TransactionsController : ControllerBase
{
    private readonly FraudDetectionService _fraudDetection;

    public TransactionsController(FraudDetectionService fraudDetection)
    {
        _fraudDetection = fraudDetection;
    }

    [HttpPost("simulate")]
    public IActionResult SimulatePix([FromBody] SimulatePixRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.SenderName) ||
            string.IsNullOrWhiteSpace(request.RecipientName) ||
            string.IsNullOrWhiteSpace(request.PixKey))
        {
            return BadRequest("Preencha todos os campos.");
        }

        if (request.Amount <= 0)
        {
            return BadRequest("O valor precisa ser maior que zero.");
        }

        var transaction = new Transaction
        {
            SenderName = request.SenderName,
            RecipientName = request.RecipientName,
            PixKey = request.PixKey,
            Amount = request.Amount,
            CreatedAt = DateTime.UtcNow
        };

        _fraudDetection.Analyze(transaction);

        return Ok(transaction);
    }
}

public class SimulatePixRequest
{
    public string SenderName { get; set; } = string.Empty;
    public string RecipientName { get; set; } = string.Empty;
    public string PixKey { get; set; } = string.Empty;
    public decimal Amount { get; set; }
}
