using Microsoft.EntityFrameworkCore;
using RestaurantReservation.Domain.Entities;
using RestaurantReservation.Domain.Interfaces;
using RestaurantReservation.Infrastructure.Context;

namespace RestaurantReservation.Infrastructure.Repositories;
public class MesaRepository : IMesaRepository
{
    private readonly ApplicationDbContext _context;

    public MesaRepository(ApplicationDbContext context)
    {
        _context = context;
    }
    public async Task<IEnumerable<Mesa>> GetAllAsync()
    {
        return await _context.Mesas.ToListAsync();
    }
    public async Task<Mesa?> GetByIdAsync(int id)
    {
        return await _context.Mesas.FindAsync(id);
    }
    public async Task AddAsync(Mesa mesa)
    {
        _context.Mesas.Add(mesa);
        await _context.SaveChangesAsync();
    }
    public async Task UpdateAsync(Mesa mesa)
    {
        _context.Mesas.Update(mesa);
        await _context.SaveChangesAsync();
    }
    public async Task DeleteAsync(int id)
    {
        var mesa = await _context.Mesas.FindAsync(id);

        if (mesa != null)
        {
            _context.Mesas.Remove(mesa);
            await _context.SaveChangesAsync();
        }
    }
}