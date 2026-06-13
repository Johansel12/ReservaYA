using System;
using Microsoft.AspNetCore.Mvc;
using RestaurantReservation.API.DTOs;

[ApiController]
[Route("api/[controller]")]
public class ReservaController : ControllerBase
{
    private static List<ReservaDTO> reservas = new List<ReservaDTO>();

    [HttpGet]
    public IEnumerable<ReservaDTO> Get()
    {
        return reservas;
    }

    [HttpPost]
    public IActionResult Post(ReservaDTO reserva)
    {
        reservas.Add(reserva);
        return Ok(reserva);
    }
}