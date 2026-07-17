using RestaurantReservation.Application.Contract;
using RestaurantReservation.Application.Dtos;
using RestaurantReservation.Domain.Interfaces;

namespace RestaurantReservation.Application.Services;
public class MesaService : IMesaService
{
    private readonly IMesaRepository _mesaRepository;
    public MesaService(IMesaRepository mesaRepository)
    {
        _mesaRepository = mesaRepository;
    }
    public async Task<IEnumerable<MesaDto>> GetAllAsync()
    {
        var mesas = await _mesaRepository.GetAllAsync();

        return mesas.Select(m => new MesaDto
        {
            Id = m.Id,
            Capacidad = m.Capacidad
        });
    }
}