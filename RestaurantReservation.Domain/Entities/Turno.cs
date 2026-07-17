using System.ComponentModel.DataAnnotations;

namespace RestaurantReservation.Domain.Entities;
public class Reserva
{
    public int Id { get; set; }

    [Required(ErrorMessage = "El cliente es obligatorio.")]
    public int ClienteId { get; set; }

    [Required(ErrorMessage = "La mesa es obligatoria.")]
    public int MesaId { get; set; }

    [Required(ErrorMessage = "El turno es obligatorio.")]
    public int TurnoId { get; set; }

    [Required(ErrorMessage = "La fecha es obligatoria.")]
    public DateTime Fecha { get; set; }
}