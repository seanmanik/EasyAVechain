
using System.Text;
using System.Text.Json;
using backend.Dtos;
using System.Numerics;
using Nethereum.Web3;
using Org.VeChain.Thor.Devkit;
using Org.VeChain.Thor.Devkit.Extension;
using Org.VeChain.Thor.Devkit.Transaction;
using Org.VeChain.Thor.Devkit.Abi;
using Nethereum.Signer;
using Nethereum.Model;
using Newtonsoft.Json.Linq;

namespace backend.Services
{  
    public class VechainService : IVechainService
    {
        public VechainService()
        {

        }
        public async Task<ShipmentInfoDto> GetShipmentInfo(string contractAddress)
        {
            contractAddress = "0x83BFE91353A3E773D3149025E002d59C2394558D";

            EntityDto entity = await GetEntityInfo(contractAddress);
            //print entity
            Console.WriteLine("Name: " + entity.Name);
            Console.WriteLine("Location: " + entity.Location);
            Console.WriteLine("Product Description: " + entity.ProductDescription);
            Console.WriteLine("Carbon: " + entity.Carbon + " kg");
            Console.WriteLine("Water: " + entity.Water + " kg");
            Console.WriteLine("Plastic: " + entity.Plastic + " kg");
            Console.WriteLine("Produce Weight: " + entity.ProduceWeight + " kg");
            Console.WriteLine("ESG Score: " + entity.EsgScore);
            Console.WriteLine("Last Updated: " + entity.LastUpdated);
            return null;

        }

        private async Task<EntityDto> GetEntityInfo(string contractAddress)
        {
                string abiJson = @"
                [
                    {
                    ""inputs"": [],
                    ""name"": ""carbonUsage"",
                    ""outputs"": [
                        {
                        ""internalType"": ""uint256"",
                        ""name"": """",
                        ""type"": ""uint256""
                        }
                    ],
                    ""stateMutability"": ""view"",
                    ""type"": ""function""
                    },
                    {
                    ""inputs"": [],
                    ""name"": ""esgScore"",
                    ""outputs"": [
                        {
                        ""internalType"": ""uint8"",
                        ""name"": """",
                        ""type"": ""uint8""
                        }
                    ],
                    ""stateMutability"": ""view"",
                    ""type"": ""function""
                    },
                    {
                    ""inputs"": [],
                    ""name"": ""location"",
                    ""outputs"": [
                        {
                        ""internalType"": ""bytes32"",
                        ""name"": """",
                        ""type"": ""bytes32""
                        }
                    ],
                    ""stateMutability"": ""view"",
                    ""type"": ""function""
                    },
                    {
                    ""inputs"": [],
                    ""name"": ""name"",
                    ""outputs"": [
                        {
                        ""internalType"": ""bytes32"",
                        ""name"": """",
                        ""type"": ""bytes32""
                        }
                    ],
                    ""stateMutability"": ""view"",
                    ""type"": ""function""
                    },
                    {
                    ""inputs"": [],
                    ""name"": ""plasticUsage"",
                    ""outputs"": [
                        {
                        ""internalType"": ""uint256"",
                        ""name"": """",
                        ""type"": ""uint256""
                        }
                    ],
                    ""stateMutability"": ""view"",
                    ""type"": ""function""
                    },
                    {
                    ""inputs"": [],
                    ""name"": ""produceWeight"",
                    ""outputs"": [
                        {
                        ""internalType"": ""uint256"",
                        ""name"": """",
                        ""type"": ""uint256""
                        }
                    ],
                    ""stateMutability"": ""view"",
                    ""type"": ""function""
                    },
                    {
                    ""inputs"": [],
                    ""name"": ""productDescription"",
                    ""outputs"": [
                        {
                        ""internalType"": ""bytes32"",
                        ""name"": """",
                        ""type"": ""bytes32""
                        }
                    ],
                    ""stateMutability"": ""view"",
                    ""type"": ""function""
                    },
                    {
                    ""inputs"": [],
                    ""name"": ""waterUsage"",
                    ""outputs"": [
                        {
                        ""internalType"": ""uint256"",
                        ""name"": """",
                        ""type"": ""uint256""
                        }
                    ],
                    ""stateMutability"": ""view"",
                    ""type"": ""function""
                    }
                ]";

                string provider = "https://rpc-testnet.vechain.energy";
                var web3 = new Web3(provider);



                var contract = web3.Eth.GetContract(abiJson, contractAddress);
                                
                var nameFunction = await contract.GetFunction("name").CallAsync<byte[]>();
                string name = Bytes32ToString(nameFunction);

                var locationBytes = await contract.GetFunction("location").CallAsync<byte[]>();
                string location = Bytes32ToString(locationBytes);

                var productDescriptionBytes = await contract.GetFunction("productDescription").CallAsync<byte[]>();
                string productDescription = Bytes32ToString(productDescriptionBytes);

                var carbonUsage = await contract.GetFunction("carbonUsage").CallAsync<BigInteger>();
                var waterUsage = await contract.GetFunction("waterUsage").CallAsync<BigInteger>();
                var plasticUsage = await contract.GetFunction("plasticUsage").CallAsync<BigInteger>();
                var produceWeight = await contract.GetFunction("produceWeight").CallAsync<BigInteger>();
                var esgScore = await contract.GetFunction("esgScore").CallAsync<BigInteger>();
                var lastUpdated = await contract.GetFunction("lastUpdated").CallAsync<BigInteger>();

                EntityDto toReturn = new EntityDto()
                {
                    Address = contractAddress,
                    Name = name,
                    Location = location,
                    ProductDescription = productDescription,
                    Carbon = (int) carbonUsage,
                    Water = (int) waterUsage,
                    Plastic = (int) plasticUsage,
                    ProduceWeight = (int) produceWeight,
                    EsgScore = (int) esgScore,
                    LastUpdated = DateTime.Now
                    
                };

                return toReturn;

            
        }

        private string Bytes32ToString(byte[] byteArray)
        {
            return Encoding.UTF8.GetString(byteArray).TrimEnd('\0'); // Remove trailing null bytes
        }


    }



}