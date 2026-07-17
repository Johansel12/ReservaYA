namespace RestaurantReservation.Application.Dtos;
public class ReservaDto
{
    public int Id { get; set; }
    public int ClienteId { get; set; }
    public int MesaId { get; set; }
    public int TurnoId { get; set; }
    public DateTime Fecha { get; set; }
}
