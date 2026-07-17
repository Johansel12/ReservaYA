using Microsoft.AspNetCore.Mvc;
using RestaurantReservation.Application.Contract;
using RestaurantReservation.Domain.Entities;
using RestaurantReservation.Domain.Interfaces;

[ApiController]
[Route("api/[controller]")]
public class TurnoController : ControllerBase
{
    private readonly ITurnoService _turnoService;
    private readonly ITurnoRepository _turnoRepository;
    public TurnoController(
        ITurnoService turnoService,
        ITurnoRepository turnoRepository)
    {
        _turnoService = turnoService;
        _turnoRepository = turnoRepository;
    }

    //GET
    [HttpGet]
    public async Task<IActionResult> Get()
    {
        return Ok(await _turnoService.GetAllAsync());
    }

    //POST
    [HttpPost]
    public async Task<IActionResult> Post(Turno turno)
    {
        await _turnoRepository.AddAsync(turno);
        return Ok(turno);
    }

    //PUT
    [HttpPut("{id}")]
    public async Task<IActionResult> Put(int id, Turno turno)
    {
        if (id != turno.Id)
        {
            return BadRequest();
        }
        await _turnoRepository.UpdateAsync(turno);
        return Ok(turno);
    }

    //DELETE
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var turno = await _turnoRepository.GetByIdAsync(id);
        if (turno == null)
        {
            return NotFound("Turno no encontrado.");
        }
        await _turnoRepository.DeleteAsync(id);
        return Ok();
    }
}