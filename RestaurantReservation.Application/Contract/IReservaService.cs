using RestaurantReservation.Application.Dtos;

namespace RestaurantReservation.Application.Contract;
public interface IReservaService
{
    Task<IEnumerable<ReservaDto>> GetAllAsync();
}