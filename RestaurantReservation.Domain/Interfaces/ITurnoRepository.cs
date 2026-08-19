using RestaurantReservation.Domain.Entities;

namespace RestaurantReservation.Domain.Interfaces;
public interface ITurnoRepository
{
    Task<IEnumerable<Turno>> GetAllAsync();
    Task<Turno?> GetByIdAsync(int id);
    Task AddAsync(Turno turno);
    Task UpdateAsync(Turno turno);
    Task DeleteAsync(int id);
}