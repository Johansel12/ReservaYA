using System;
using Microsoft.AspNetCore.Mvc;
using RestauranReservation.API.DTOs;

[ApiController]
[Route("api/[controller]")]
public class TurnoController : ControllerBase
{
    private static List<TurnoDTO> turnos = new List<TurnoDTO>();

    [HttpGet]
    public IEnumerable<TurnoDTO> Get()
    {
        return turnos;
    }

    [HttpPost]
    public IActionResult Post(TurnoDTO turno)
    {
        turnos.Add(turno);
        return Ok(turno);
    }
}
