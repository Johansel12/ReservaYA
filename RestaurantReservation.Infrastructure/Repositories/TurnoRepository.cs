using Microsoft.EntityFrameworkCore;
using RestaurantReservation.Domain.Entities;
using RestaurantReservation.Domain.Interfaces;
using RestaurantReservation.Infrastructure.Context;

namespace RestaurantReservation.Infrastructure.Repositories;
public class TurnoRepository : ITurnoRepository
{
    private readonly ApplicationDbContext _context;
    public TurnoRepository(ApplicationDbContext context)
    {
        _context = context;
    }
    public async Task<IEnumerable<Turno>> GetAllAsync()
    {
        return await _context.Turnos.ToListAsync();
    }
    public async Task<Turno?> GetByIdAsync(int id)
    {
        return await _context.Turnos.FindAsync(id);
    }
    public async Task AddAsync(Turno turno)
    {
        _context.Turnos.Add(turno);
        await _context.SaveChangesAsync();
    }
    public async Task UpdateAsync(Turno turno)
    {
        _context.Turnos.Update(turno);
        await _context.SaveChangesAsync();
    }
    public async Task DeleteAsync(int id)
    {
        var turno = await _context.Turnos.FindAsync(id);

        if (turno != null)
        {
            _context.Turnos.Remove(turno);
            await _context.SaveChangesAsync();
        }
    }
}
