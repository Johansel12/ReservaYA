using Microsoft.EntityFrameworkCore;
using RestaurantReservation.Infrastructure.Context;
using RestaurantReservation.Domain.Entities;
using RestaurantReservation.Domain.Interfaces;

namespace RestaurantReservation.Infrastructure.Repositories;
public class ClienteRepository : IClienteRepository
{
    private readonly ApplicationDbContext _context;
    public ClienteRepository(ApplicationDbContext context)
    {
        _context = context;
    }
    public async Task<IEnumerable<Cliente>> GetAllAsync()
    {
        return await _context.Clientes.ToListAsync();
    }
    public async Task<Cliente?> GetByIdAsync(int id)
    {
        return await _context.Clientes.FindAsync(id);
    }
    public async Task AddAsync(Cliente cliente)
    {
        _context.Clientes.Add(cliente);
        await _context.SaveChangesAsync();
    }
    public async Task UpdateAsync(Cliente cliente)
    {
        _context.Clientes.Update(cliente);
        await _context.SaveChangesAsync();
    }
    public async Task DeleteAsync(int id)
    {
        var cliente = await _context.Clientes.FindAsync(id);

        if (cliente != null)
        {
            _context.Clientes.Remove(cliente);
            await _context.SaveChangesAsync();
        }
    }
}