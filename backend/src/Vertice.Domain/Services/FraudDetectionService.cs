
using Vertice.Domain.Entities;

namespace Vertice.Domain.Services;

public class FraudDetectionService
{
    public void Analyze(Transaction transaction)
    {
        int score = 0;
        var reasons = new List<string>();

        if (transaction.Amount >= 10000)
        {
            score += 40;
            reasons.Add("Transação de valor muito elevado.");
        }
        else if (transaction.Amount >= 5000)
        {
            score += 20;
            reasons.Add("Transação de valor elevado.");
        }

        if (transaction.CreatedAt.Hour < 5)
        {
            score += 20;
            reasons.Add("Transação realizada durante a madrugada.");
        }

        if (transaction.Amount <= 0)
        {
            score = 100;
            reasons.Add("Valor da transação inválido.");
        }

        transaction.RiskScore = Math.Clamp(score, 0, 100);

        transaction.RiskLevel = transaction.RiskScore switch
        {
            >= 70 => "High",
            >= 30 => "Medium",
            _ => "Low"
        };

        transaction.Status = transaction.RiskScore switch
        {
            >= 70 => "Blocked",
            >= 30 => "UnderReview",
            _ => "Approved"
        };

        transaction.RiskReason = reasons.Count > 0
            ? string.Join(" ", reasons)
            : "Nenhum comportamento suspeito identificado.";
    }
}
