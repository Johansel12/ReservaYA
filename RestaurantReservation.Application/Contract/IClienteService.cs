using RestaurantReservation.Application.Dtos;

namespace RestaurantReservation.Application.Contract;
public interface IClienteService
{
    Task<IEnumerable<ClienteDto>> GetAllAsync();
}