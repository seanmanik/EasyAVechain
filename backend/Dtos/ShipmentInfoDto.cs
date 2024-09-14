using Microsoft.AspNetCore.Mvc;

namespace backend.Dtos
{    
    public class ShipmentInfoDto
    {
        public string Name { get; set; } = "";
        public int Quantity { get; set; } = 0;
        public int EntityCount { get; set; } = 0;
        public List<EntityDto> RawMaterialSource { get; set; } = null;
        public List<EntityDto> Processor { get; set; } = new List<EntityDto>();
        public EntityDto Distributor { get; set; } = null;
        public EntityDto Retailer { get; set; } = null;
    }

    public class EntityDto
    {
        public string Address { get; set; } = "";
        public string Name { get; set; } = "";
        public string Location { get; set; } = "";
        public string ProductDescription { get; set; } = "";
        public int Carbon { get; set; } = 0;
        public int Water { get; set; } = 0;
        public int Plastic { get; set; } = 0;
        public int ProduceWeight { get; set; } = 0;
        public int EsgScore { get; set; } = 0;
        public DateTime LastUpdated { get; set; } = DateTime.Now;
    }
}

