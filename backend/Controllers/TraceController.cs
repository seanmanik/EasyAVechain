using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TraceController : ControllerBase
    {

        [HttpGet("ShipmentInfo")]
        public IActionResult GetShipmentInfo(string txHash)
        {
            // Ship shipmentInfo = GetShipmentInfo(txHash);
            Console.WriteLine(txHash);
            
            return Ok();
        }
    }
}


