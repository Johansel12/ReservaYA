using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RestaurantReservation.API.Data;
using RestaurantReservation.Domain.Entities;

[ApiController]
[Route("api/[controller]")]
public class TurnoController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public TurnoController(ApplicationDbContext context)
    {
        _context = context;
    }

    //GET
    [HttpGet]
    public async Task<IEnumerable<Turno>> Get()
    {
        return await _context.Turnos.ToListAsync();
    }

    //POST
    [HttpPost]
    public async Task<IActionResult> Post(Turno turno)
    {
        _context.Turnos.Add(turno);
        await _context.SaveChangesAsync();
        return Ok(turno);
    }

    //PUT
    [HttpPut("{id}")]
    public async Task<IActionResult> Put(int id, Turno turno)
    {
        if (id != turno.Id)
            return BadRequest();

        _context.Entry(turno).State = EntityState.Modified;
        await _context.SaveChangesAsync();

        return Ok(turno);
    }

    //DELETE
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var turno = await _context.Turnos.FindAsync(id);

        if (turno == null)
            return NotFound();

        _context.Turnos.Remove(turno);
        await _context.SaveChangesAsync();

        return Ok();
    }
}
