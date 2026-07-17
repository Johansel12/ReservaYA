using Microsoft.AspNetCore.Mvc;
using RestaurantReservation.Domain.Entities;
using RestaurantReservation.Domain.Interfaces;

[ApiController]
[Route("api/[controller]")]
public class ClienteController : ControllerBase
{
    private readonly IClienteRepository _clienteRepository;
    public ClienteController(IClienteRepository clienteRepository)
    {
        _clienteRepository = clienteRepository;
    }

    //GET
    [HttpGet]
    public async Task<IEnumerable<Cliente>> Get()
    {
        return await _clienteRepository.GetAllAsync();
    }

    //POST
    [HttpPost]
    public async Task<IActionResult> Post(Cliente cliente)
    {
        await _clienteRepository.AddAsync(cliente);
        return Ok(cliente);
    }

    //PUT
    [HttpPut("{id}")]
    public async Task<IActionResult> Put(int id, Cliente cliente)
    {
        if (id != cliente.Id)
        {
            return BadRequest();
        }
        await _clienteRepository.UpdateAsync(cliente);
        return Ok(cliente);
    }

    //DELETE
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var cliente = await _clienteRepository.GetByIdAsync(id);
        if (cliente == null)
        {
            return NotFound("Cliente no encontrado.");
        }
        await _clienteRepository.DeleteAsync(id);
        return Ok();
    }
}