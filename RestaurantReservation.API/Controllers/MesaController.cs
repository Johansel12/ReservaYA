using Microsoft.AspNetCore.Mvc;
using RestaurantReservation.Application.Contract;
using RestaurantReservation.Domain.Entities;
using RestaurantReservation.Domain.Interfaces;

[ApiController]
[Route("api/[controller]")]
public class MesaController : ControllerBase
{
    private readonly IMesaService _mesaService;
    private readonly IMesaRepository _mesaRepository;

    public MesaController(
        IMesaService mesaService,
        IMesaRepository mesaRepository)
    {
        _mesaService = mesaService;
        _mesaRepository = mesaRepository;
    }

    //GET
    [HttpGet]
    public async Task<IActionResult> Get()
    {
        return Ok(await _mesaService.GetAllAsync());
    }

    //POST
    [HttpPost]
    public async Task<IActionResult> Post(Mesa mesa)
    {
        await _mesaRepository.AddAsync(mesa);
        return Ok(mesa);
    }

    //PUT
    [HttpPut("{id}")]
    public async Task<IActionResult> Put(int id, Mesa mesa)
    {
        if (id != mesa.Id)
        {
            return BadRequest();
        }
        await _mesaRepository.UpdateAsync(mesa);
        return Ok(mesa);
    }

    //DELETE
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var mesa = await _mesaRepository.GetByIdAsync(id);
        if (mesa == null)
        {
            return NotFound("Mesa no encontrada.");
        }
        await _mesaRepository.DeleteAsync(id);
        return Ok();
    }
}