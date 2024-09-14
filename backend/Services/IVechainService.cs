using backend.Dtos;

namespace backend.Services
{    
    public interface IVechainService
    {
        public Task<ShipmentInfoDto> GetShipmentInfo(string contractAddress);
    }
}
