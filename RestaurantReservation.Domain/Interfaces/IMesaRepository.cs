using RestaurantReservation.Domain.Entities;

namespace RestaurantReservation.Domain.Interfaces;

public interface IMesaRepository
{
    Task<IEnumerable<Mesa>> GetAllAsync();
    Task<Mesa?> GetByIdAsync(int id);
    Task AddAsync(Mesa mesa);
    Task UpdateAsync(Mesa mesa);
    Task DeleteAsync(int id);
}