using RestaurantReservation.Application.Contract;
using RestaurantReservation.Application.Dtos;
using RestaurantReservation.Domain.Interfaces;

namespace RestaurantReservation.Application.Services;
public class ClienteService : IClienteService
{
    private readonly IClienteRepository _clienteRepository;
    public ClienteService(IClienteRepository clienteRepository)
    {
        _clienteRepository = clienteRepository;
    }
    public async Task<IEnumerable<ClienteDto>> GetAllAsync()
    {
        var clientes = await _clienteRepository.GetAllAsync();

        return clientes.Select(c => new ClienteDto
        {
            Id = c.Id,
            Nombre = c.Nombre,
            Telefono = c.Telefono,
            Email = c.Email
        });
    }
}
