using Microsoft.EntityFrameworkCore;
using RestaurantReservation.Infrastructure.Context;
using RestaurantReservation.Domain.Interfaces;
using RestaurantReservation.Infrastructure.Repositories;
using RestaurantReservation.Application.Contract;
using RestaurantReservation.Application.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services
builder.Services.AddControllers();

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddScoped<IClienteRepository, ClienteRepository>();
builder.Services.AddScoped<IMesaRepository, MesaRepository>();
builder.Services.AddScoped<ITurnoRepository, TurnoRepository>();
builder.Services.AddScoped<IReservaRepository, ReservaRepository>();

builder.Services.AddScoped<IClienteService, ClienteService>();
builder.Services.AddScoped<IMesaService, MesaService>();
builder.Services.AddScoped<ITurnoService, TurnoService>();
builder.Services.AddScoped<IReservaService, ReservaService>();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddPolicy("Frontend",
        policy =>
        {
            policy.AllowAnyOrigin()
                  .AllowAnyMethod()
                  .AllowAnyHeader();
        });
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.UseCors("Frontend");
app.MapControllers();

app.Run();