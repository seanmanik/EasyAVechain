
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

            // Entity Contracts is retrieved from shipment contract.
            string abi = @"[
                {
                    ""inputs"": [],
                    ""name"": ""distributor"",
                    ""outputs"": [
                    {
                        ""internalType"": ""contract EntityInterface"",
                        ""name"": """",
                        ""type"": ""address""
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
                    ""inputs"": [
                    {
                        ""internalType"": ""uint256"",
                        ""name"": """",
                        ""type"": ""uint256""
                    }
                    ],
                    ""name"": ""processors"",
                    ""outputs"": [
                    {
                        ""internalType"": ""contract EntityInterface"",
                        ""name"": """",
                        ""type"": ""address""
                    }
                    ],
                    ""stateMutability"": ""view"",
                    ""type"": ""function""
                },
                {
                    ""inputs"": [
                    {
                        ""internalType"": ""uint256"",
                        ""name"": """",
                        ""type"": ""uint256""
                    }
                    ],
                    ""name"": ""rawMaterials"",
                    ""outputs"": [
                    {
                        ""internalType"": ""contract EntityInterface"",
                        ""name"": """",
                        ""type"": ""address""
                    }
                    ],
                    ""stateMutability"": ""view"",
                    ""type"": ""function""
                },
                {
                    ""inputs"": [],
                    ""name"": ""retailer"",
                    ""outputs"": [
                    {
                        ""internalType"": ""contract EntityInterface"",
                        ""name"": """",
                        ""type"": ""address""
                    }
                    ],
                    ""stateMutability"": ""view"",
                    ""type"": ""function""
                }
                ]";

            List<string> entityContracts =  await getEntityContracts(contractAddress, abi);
            List<EntityDto> entities = new List<EntityDto>();
            List<Task<EntityDto>> tasks = new List<Task<EntityDto>>();

            for (int i = 0; i < entityContracts.Count; i++)
            {
                // Create tasks for each entity info retrieval
                tasks.Add(GetEntityInfo(entityContracts[i]));
            }

            // Wait for all tasks to complete
            EntityDto[] entitiesArray = await Task.WhenAll(tasks);

            // Convert the array back to a list and add to your entities list
            entities.AddRange(entitiesArray);
            string provider = "https://rpc-testnet.vechain.energy";
            var web3 = new Web3(provider);

            var contract = web3.Eth.GetContract(abi, contractAddress);

            var nameFunction = await contract.GetFunction("name").CallAsync<byte[]>();
            string name = Bytes32ToString(nameFunction);
            int quantity = 0;
            foreach(EntityDto entity in entities) {
                quantity += entity.ProduceWeight;
            }
            Console.WriteLine(entities.Count);
            ShipmentInfoDto shipmentInfo = new ShipmentInfoDto()
            {
                Name = name,
                Quantity = quantity,
                EntityCount = entities.Count,
                RawMaterialSource = entities.GetRange(0, 3),
                Processor = entities.GetRange(3, 5),
                Distributor = entities[8],
                Retailer = entities[9]
            };
            return shipmentInfo;

        }

        private async Task<List<string>> getEntityContracts(string contractAddress, string abi)
        {
            List<string> toReturn = new List<string>();
            string provider = "https://rpc-testnet.vechain.energy";
            var web3 = new Web3(provider);
            var contract = web3.Eth.GetContract(abi, contractAddress);

            // Create tasks for distributor and retailer
            Task<string> distributorTask = contract.GetFunction("distributor").CallAsync<string>();
            Task<string> retailerTask = contract.GetFunction("retailer").CallAsync<string>();

            // Parallelize raw materials retrieval
            Task<List<string>> rawMaterialsTask = Task.Run(async () =>
            {
                List<string> rawMaterials = new List<string>();
                int rawMaterialIndex = 0;
                while (true)
                {
                    try
                    {
                        string rawMaterialAddress = await contract.GetFunction("rawMaterials").CallAsync<string>(rawMaterialIndex);
                        if (string.IsNullOrEmpty(rawMaterialAddress) || rawMaterialAddress.Length < 10)
                        {
                            break;
                        }
                        rawMaterials.Add(rawMaterialAddress);
                        rawMaterialIndex++;
                    }
                    catch
                    {
                        break;
                    }
                }
                return rawMaterials;
            });

            // Parallelize processors retrieval
            Task<List<string>> processorsTask = Task.Run(async () =>
            {
                List<string> processors = new List<string>();
                int processorIndex = 0;
                while (true)
                {
                    try
                    {
                        string processorAddress = await contract.GetFunction("processors").CallAsync<string>(processorIndex);
                        if (string.IsNullOrEmpty(processorAddress) || processorAddress.Length < 10)
                        {
                            break;
                        }
                        processors.Add(processorAddress);
                        processorIndex++;
                    }
                    catch
                    {
                        break;
                    }
                }
                return processors;
            });

            // Wait for all tasks to complete
            await Task.WhenAll(distributorTask, retailerTask, rawMaterialsTask, processorsTask);

            // Collect results
            toReturn.AddRange(await rawMaterialsTask);
            toReturn.AddRange(await processorsTask);
            toReturn.Add(await distributorTask);
            toReturn.Add(await retailerTask);

            return toReturn;

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
                        ""name"": ""lastUpdated"",
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
                                
                var nameTask = contract.GetFunction("name").CallAsync<byte[]>();
                var locationTask = contract.GetFunction("location").CallAsync<byte[]>();
                var productDescriptionTask = contract.GetFunction("productDescription").CallAsync<byte[]>();
                var carbonUsageTask = contract.GetFunction("carbonUsage").CallAsync<BigInteger>();
                var waterUsageTask = contract.GetFunction("waterUsage").CallAsync<BigInteger>();
                var plasticUsageTask = contract.GetFunction("plasticUsage").CallAsync<BigInteger>();
                var produceWeightTask = contract.GetFunction("produceWeight").CallAsync<BigInteger>();
                var esgScoreTask = contract.GetFunction("esgScore").CallAsync<BigInteger>();
                var lastUpdatedTask = contract.GetFunction("lastUpdated").CallAsync<BigInteger>();

                // Wait for all tasks to complete
                await Task.WhenAll(nameTask, locationTask, productDescriptionTask, carbonUsageTask, waterUsageTask, plasticUsageTask, produceWeightTask, esgScoreTask, lastUpdatedTask);

                // Process the results
                string name = Bytes32ToString(await nameTask);
                string location = Bytes32ToString(await locationTask);
                string productDescription = Bytes32ToString(await productDescriptionTask);

                BigInteger carbonUsage = await carbonUsageTask;
                BigInteger waterUsage = await waterUsageTask;
                BigInteger plasticUsage = await plasticUsageTask;
                BigInteger produceWeight = await produceWeightTask;
                BigInteger esgScore = await esgScoreTask;
                BigInteger lastUpdated = await lastUpdatedTask;
                EntityDto entity = new EntityDto()
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
                    LastUpdated = DateTime.UnixEpoch.AddSeconds((long) lastUpdated)
                    
                };


                return entity;

            
        }

        private string Bytes32ToString(byte[] byteArray)
        {
            return Encoding.UTF8.GetString(byteArray).TrimEnd('\0'); // Remove trailing null bytes
        }


    }



}