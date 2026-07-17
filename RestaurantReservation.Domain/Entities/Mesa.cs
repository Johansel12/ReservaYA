using System.ComponentModel.DataAnnotations;

namespace RestaurantReservation.Domain.Entities;
public class Mesa
{
    public int Id { get; set; }
    [Range(1, 20, ErrorMessage = "La capacidad debe estar entre 1 y 20.")]
    public int Capacidad { get; set; }
}