namespace backend.Dtos
{    
    public class ShipmentInfoDto
    {
        public string Name { get; set; } = "";
        public decimal Quantity { get; set; } = 0;
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
        public decimal CarbonUsage { get; set; } = 0;
        public decimal WaterUsage { get; set; } = 0;
        public decimal PlasticUsage { get; set; } = 0;
        public decimal ProduceWeight { get; set; } = 0;
        public int EsgScore { get; set; } = 0;
        public DateTime LastUpdated { get; set; } = DateTime.Now;
    }
}

