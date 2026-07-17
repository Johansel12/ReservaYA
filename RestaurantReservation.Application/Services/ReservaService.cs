using RestaurantReservation.Application.Contract;
using RestaurantReservation.Application.Dtos;
using RestaurantReservation.Domain.Interfaces;

namespace RestaurantReservation.Application.Services;
public class ReservaService : IReservaService
{
    private readonly IReservaRepository _reservaRepository;
    public ReservaService(IReservaRepository reservaRepository)
    {
        _reservaRepository = reservaRepository;
    }
    public async Task<IEnumerable<ReservaDto>> GetAllAsync()
    {
        var reservas = await _reservaRepository.GetAllAsync();

        return reservas.Select(r => new ReservaDto
        {
            Id = r.Id,
            ClienteId = r.ClienteId,
            MesaId = r.MesaId,
            TurnoId = r.TurnoId,
            Fecha = r.Fecha
        });
    }
}
