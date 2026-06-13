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

    //GET
    [HttpGet]
    public async Task<IEnumerable<Mesa>> Get()
    {
        return await _context.Mesas.ToListAsync();
    }

    //POST
    [HttpPost]
    public async Task<IActionResult> Post(Mesa mesa)
    {
        _context.Mesas.Add(mesa);
        await _context.SaveChangesAsync();
        return Ok(mesa);
    }

    //PUT
    [HttpPut("{id}")]
    public async Task<IActionResult> Put(int id, Mesa mesa)
    {
        if (id != mesa.Id)
            return BadRequest();

        _context.Entry(mesa).State = EntityState.Modified;
        await _context.SaveChangesAsync();

        return Ok(mesa);
    }

    //DELETE
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var mesa = await _context.Mesas.FindAsync(id);

        if (mesa == null)
            return NotFound();

        _context.Mesas.Remove(mesa);
        await _context.SaveChangesAsync();

        return Ok();
    }
}