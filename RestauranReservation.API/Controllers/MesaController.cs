using System;
using Microsoft.AspNetCore.Mvc;
using RestauranReservation.API.DTOs;

[ApiController]
[Route("api/[controller]")]
public class MesaController : ControllerBase
{
    private static List<MesaDTO> mesas = new List<MesaDTO>();

    [HttpGet]
    public IEnumerable<MesaDTO> Get()
    {
        return mesas;
    }

    [HttpPost]
    public IActionResult Post(MesaDTO mesa)
    {
        mesas.Add(mesa);
        return Ok(mesa);
    }
}