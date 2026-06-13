using System;
using Microsoft.AspNetCore.Mvc;
using RestaurantReservation.API.DTOs;

[ApiController]
[Route("api/[controller]")]
public class ClienteController : ControllerBase
{
    private static List<ClienteDTO> clientes = new List<ClienteDTO>();

    [HttpGet]
    public IEnumerable<ClienteDTO> Get()
    {
        return clientes;
    }

    [HttpPost]
    public IActionResult Post(ClienteDTO cliente)
    {
        clientes.Add(cliente);
        return Ok(cliente);
    }
}
