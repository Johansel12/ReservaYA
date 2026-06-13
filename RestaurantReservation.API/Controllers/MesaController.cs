using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RestaurantReservation.API.Data;
using RestaurantReservation.API.Entities;

[ApiController]
[Route("api/[controller]")]
public class MesaController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public MesaController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IEnumerable<Mesa>> Get()
    {
        return await _context.Mesas.ToListAsync();
    }

    [HttpPost]
    public async Task<IActionResult> Post(Mesa mesa)
    {
        _context.Mesas.Add(mesa);
        await _context.SaveChangesAsync();
        return Ok(mesa);
    }
}