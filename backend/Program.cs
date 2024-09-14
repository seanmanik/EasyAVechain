using backend.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


builder.Services.AddCors((options) =>
{
    options.AddPolicy("DevCors", (corsBuilder) =>
    {
        // Angular is 4200, React is 3000, Vue is 8000
        // Allow for front end to connect to back end
        corsBuilder.WithOrigins("http://localhost:5173", "http://localhost:3000", "http://localhost:8080")
            .AllowAnyMethod()
            .AllowAnyHeader()
            .AllowCredentials();
    });

    options.AddPolicy("ProdCors", (corsBuilder) =>
    {
        // Angular is 4200, React is 3000, Vue is 8000
        // Allow for front end to connect to back end
        // Put the actual domain.
        corsBuilder.WithOrigins("http://localhost:5173", "http://localhost:3000", "http://localhost:8080")
            .AllowAnyMethod()
            .AllowAnyHeader()
            .AllowCredentials();
    });

});


builder.Services.AddScoped<IVechainService, VechainService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();

    // Apply the "DevCors" policy in development mode
    app.UseCors("DevCors");
}
else
{
    // Apply the "ProdCors" policy in production mode
    app.UseCors("ProdCors");
}
app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();  // This enables the controller routing

app.Run();
