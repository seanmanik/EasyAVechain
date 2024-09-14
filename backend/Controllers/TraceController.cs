using Microsoft.AspNetCore.Mvc;
using backend.Dtos;
using backend.Services;

namespace backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TraceController : ControllerBase
    {
        IVechainService _vechainService;
        public TraceController(IVechainService vechainService)
        {
            _vechainService = vechainService;
        }

        [HttpGet("ShipmentInfo")]
        public async Task<IActionResult> GetShipmentInfo(string txHash)
        {
            ShipmentInfoDto shipmentInfo = await _vechainService.GetShipmentInfo(txHash);
            return Ok(shipmentInfo);
        }

    }
    
}


