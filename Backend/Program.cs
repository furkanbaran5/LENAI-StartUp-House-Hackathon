using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using OllamaApi.Data;
using OllamaApi.Services;
var builder = WebApplication.CreateBuilder(args);


builder.Services.AddOpenApi();
builder.Services.AddControllers();
builder.Services.AddHttpClient();
builder.Services.AddHttpClient<MetaAdsService>();
// EF Core SQL Server
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
// CORS policy tanımı
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowLocalhost", policy =>
    {
        policy
            .WithOrigins("http://localhost:5000") // frontend adresi
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});
var app = builder.Build();


builder.Services.AddEndpointsApiExplorer();



if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}
// CORS middleware
app.UseCors("AllowLocalhost");
app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.Run();
