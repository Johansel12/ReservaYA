using RestaurantReservation.Application.Dtos;

namespace RestaurantReservation.Application.Contract;

public interface ITurnoService
{
    Task<IEnumerable<TurnoDto>> GetAllAsync();
}
