using System;
namespace RestaurantReservation.API.DTOs
{
    public class ReservaDTO
    {
        public int Id { get; set; }
        public int ClienteId { get; set; }
        public int MesaId { get; set; }
        public int TurnoId { get; set; }
        public DateTime Fecha { get; set; }
    }
}