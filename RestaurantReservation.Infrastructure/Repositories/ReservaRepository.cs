using Microsoft.EntityFrameworkCore;
using RestaurantReservation.Domain.Entities;
using RestaurantReservation.Domain.Interfaces;
using RestaurantReservation.Infrastructure.Context;

namespace RestaurantReservation.Infrastructure.Repositories;
public class ReservaRepository : IReservaRepository
{
    private readonly ApplicationDbContext _context;
    public ReservaRepository(ApplicationDbContext context)
    {
        _context = context;
    }
    public async Task<IEnumerable<Reserva>> GetAllAsync()
    {
        return await _context.Reservas.ToListAsync();
    }
    public async Task<Reserva?> GetByIdAsync(int id)
    {
        return await _context.Reservas.FindAsync(id);
    }
    public async Task AddAsync(Reserva reserva)
    {
        _context.Reservas.Add(reserva);
        await _context.SaveChangesAsync();
    }
    public async Task UpdateAsync(Reserva reserva)
    {
        _context.Reservas.Update(reserva);
        await _context.SaveChangesAsync();
    }
    public async Task DeleteAsync(int id)
    {
        var reserva = await _context.Reservas.FindAsync(id);

        if (reserva != null)
        {
            _context.Reservas.Remove(reserva);
            await _context.SaveChangesAsync();
        }
    }
}