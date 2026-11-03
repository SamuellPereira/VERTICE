
namespace Vertice.Domain.Entities;

public class Transaction
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string SenderName { get; set; } = string.Empty;
    public string RecipientName { get; set; } = string.Empty;
    public string PixKey { get; set; } = string.Empty;
    public decimal Amount { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public int RiskScore { get; set; }
    public string RiskLevel { get; set; } = "Pending";
    public string Status { get; set; } = "Pending";
    public string RiskReason { get; set; } = string.Empty;
}
