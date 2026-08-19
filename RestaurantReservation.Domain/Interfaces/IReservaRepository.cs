using RestaurantReservation.Domain.Entities;

namespace RestaurantReservation.Domain.Interfaces;
public interface IReservaRepository
{
    Task<IEnumerable<Reserva>> GetAllAsync();
    Task<Reserva?> GetByIdAsync(int id);
    Task AddAsync(Reserva reserva);
    Task UpdateAsync(Reserva reserva);
    Task DeleteAsync(int id);
}
 