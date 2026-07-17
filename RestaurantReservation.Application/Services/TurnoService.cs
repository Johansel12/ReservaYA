using RestaurantReservation.Application.Contract;
using RestaurantReservation.Application.Dtos;
using RestaurantReservation.Domain.Interfaces;

namespace RestaurantReservation.Application.Services;
public class TurnoService : ITurnoService
{
    private readonly ITurnoRepository _turnoRepository;

    public TurnoService(ITurnoRepository turnoRepository)
    {
        _turnoRepository = turnoRepository;
    }
    public async Task<IEnumerable<TurnoDto>> GetAllAsync()
    {
        var turnos = await _turnoRepository.GetAllAsync();

        return turnos.Select(t => new TurnoDto
        {
            Id = t.Id,
            Horario = t.Horario
        });
    }
}