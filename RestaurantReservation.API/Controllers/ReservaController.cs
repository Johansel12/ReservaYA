using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RestaurantReservation.Infrastructure.Context;
using RestaurantReservation.Domain.Entities;

[ApiController]
[Route("api/[controller]")]
public class ReservaController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public ReservaController(ApplicationDbContext context)
    {
        _context = context;
    }

    //GET
    [HttpGet]
    public async Task<IEnumerable<Reserva>> Get()
    {
        return await _context.Reservas.ToListAsync();
    }

    //POST
    [HttpPost]
    public async Task<IActionResult> Post(Reserva reserva)
    {
        _context.Reservas.Add(reserva);
        await _context.SaveChangesAsync();
        return Ok(reserva);
    }

    //PUT
    [HttpPut("{id}")]
    public async Task<IActionResult> Put(int id, Reserva reserva)
    {
        if (id != reserva.Id)
            return BadRequest();

        _context.Entry(reserva).State = EntityState.Modified;
        await _context.SaveChangesAsync();

        return Ok(reserva);
    }

    //DELETE
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var reserva = await _context.Reservas.FindAsync(id);

        if (reserva == null)
            return NotFound();

        _context.Reservas.Remove(reserva);
        await _context.SaveChangesAsync();

        return Ok();
    }
}
