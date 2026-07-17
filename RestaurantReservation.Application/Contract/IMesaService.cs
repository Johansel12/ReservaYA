using RestaurantReservation.Application.Dtos;

namespace RestaurantReservation.Application.Contract;
public interface IMesaService
{
    Task<IEnumerable<MesaDto>> GetAllAsync();
}