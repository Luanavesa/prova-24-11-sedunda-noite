using API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<AppDataContext>();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
    });
});

var app = builder.Build();
app.UseCors("AllowAll");

app.MapGet("/", () => "Prova A2");

app.MapGet("/api/chamado/listar", ([FromServices] AppDataContext ctx) =>
{
    if (ctx.Chamados.Any())
    {
        return Results.Ok(ctx.Chamados.ToList());
    }
    return Results.NotFound();
});

app.MapPost("/api/chamado/cadastrar", ([FromServices] AppDataContext ctx, [FromBody] Chamado chamado) =>
{
    ctx.Chamados.Add(chamado);
    ctx.SaveChanges();
    return Results.Created("", chamado);
});

app.MapPatch("/api/chamado/alterar", ([FromServices] AppDataContext ctx, [FromBody] Chamado chamado) =>
{
    var existente = ctx.Chamados.Find(chamado.ChamadoId);
    if (existente == null) return Results.NotFound();
    
    if (existente.Status == "Aberto")
        existente.Status = "Em atendimento";
    else if (existente.Status == "Em atendimento")
        existente.Status = "Resolvido";
    
    ctx.SaveChanges();
    return Results.Ok(existente);
});

app.MapGet("/api/chamado/naoresolvido", ([FromServices] AppDataContext ctx) =>
{
    var lista = ctx.Chamados
        .Where(c => c.Status == "Aberto" || c.Status == "Em atendimento")
        .ToList();

    return Results.Ok(lista);
});

app.MapGet("/api/chamado/resolvidos", ([FromServices] AppDataContext ctx) =>
{
    var lista = ctx.Chamados
        .Where(c => c.Status == "Resolvido")
        .ToList();

    return Results.Ok(lista);
});

app.MapGet("/api/chamado/abertos", ([FromServices] AppDataContext ctx) =>
{
    var lista = ctx.Chamados
        .Where(c => c.Status == "Aberto")
        .ToList();

    return Results.Ok(lista);
});

app.Run();
