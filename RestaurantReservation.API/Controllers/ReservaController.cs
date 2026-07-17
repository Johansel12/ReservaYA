using Microsoft.AspNetCore.Mvc;
using RestaurantReservation.Domain.Entities;
using RestaurantReservation.Domain.Interfaces;

[ApiController]
[Route("api/[controller]")]
public class ReservaController : ControllerBase
{
    private readonly IReservaRepository _reservaRepository;
    public ReservaController(IReservaRepository reservaRepository)
    {
        _reservaRepository = reservaRepository;
    }

    //GET
    [HttpGet]
    public async Task<IEnumerable<Reserva>> Get()
    {
        return await _reservaRepository.GetAllAsync();
    }

    //POST
    [HttpPost]
    public async Task<IActionResult> Post(Reserva reserva)
    {
        await _reservaRepository.AddAsync(reserva);
        return Ok(reserva);
    }

    //PUT
    [HttpPut("{id}")]
    public async Task<IActionResult> Put(int id, Reserva reserva)
    {
        if (id != reserva.Id)
        {
            return BadRequest();
        }
        await _reservaRepository.UpdateAsync(reserva);
        return Ok(reserva);
    }

    //DELETE
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var reserva = await _reservaRepository.GetByIdAsync(id);

        if (reserva == null)
        {
            return NotFound("Reserva no encontrada.");
        }
        await _reservaRepository.DeleteAsync(id);
        return Ok();
    }
}