using System.ComponentModel.DataAnnotations;

namespace RestaurantReservation.Domain.Entities;
public class Turno
{
    public int Id { get; set; }

    [Required(ErrorMessage = "El horario es obligatorio.")]
    public string Horario { get; set; } = string.Empty;
}