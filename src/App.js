import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { formatDistanceToNow } from 'date-fns';

const API_BASE_URL = 'https://data-api.polymarket.com';

const CATEGORIES = {
  All: [], // This will be handled specially to show everything
  Politics: [
"0x7177a7f5c216809c577c50c77b12aae81f81ddef",
"0x090a0d3fc9d68d3e16db70e3460e3e4b510801b4",
"0x889e7f0464c72eb8cda1525ebc12b6aaba9d09e0",
"0x124f7b74916d41460dc3dfefa0e5ef4b14783661",
"0x000d257d2dc7616feaef4ae0f14600fdf50a758e",
"0xdbade4c82fb72780a0db9a38f821d8671aba9c95",
"0x9db778f46b7c9b458045764a67ff4afcae917e1f",
"0xecaa8806a9a05049d7d5260a33dc924220e377a9",
"0xdac862d4677cf9316a508978578c688a24ddeb85",
"0x9c99d17ed70d628cff56c5d7bec2eaf567137250",
"0xf2f6af4f27ec2dcf4072095ab804016e14cd5817",
"0x2bf309dd001df4f9b1f90c26432d6ff457a38c3d",
"0xce71bed9dd1418abc34d244730879d795e8683bc",
"0x8365a0c9908dca494abaf0b90584162b474ce9a6",
"0xe899b5ea69afb161da7a35597b6fe70398860899",
"0x448861155279dbf833d041b963e3ac854599e319",
"0x64c8ec47e1f5a367f234a74f8176d805e87173ce",
"0x8795bcb2fe129d1ea3e3d73bc13a3d8078047544",
"0xbacd00c9080a82ded56f504ee8810af732b0ab35",
"0xecb14ac6e9ca447ce2f2912e6217b43d7b655da3"
  ],
  Sports: [
"0xed88d69d689f3e2f6d1f77b2e35d089c581df3c4",
"0x43d4482a0a69d9bcfea8ce6432629b26c19a13a2",
"0xa9878e59934ab507f9039bcb917c1bae0451141d",
"0x9707eafc9c59ae1631f5c0d7cf342c122592e3bc",
"0xafbacaeeda63f31202759eff7f8126e49adfe61b",
"0x2005d16a84ceefa912d4e380cd32e7ff827875ea",
"0xc35049bc7b6bd28a49a40b261466ca91aad63669",
"0xed88d69d689f3e2f6d1f77b2e35d089c581df3c4",
"0xaf385a0ebd6f3b6cbb7eac15af99f56dcd30a59b",
"0x900c83447eb74c3f29f17658e848e2715ca41d7a",
"0xa9878e59934ab507f9039bcb917c1bae0451141d",
"0x14964aefa2cd7caff7878b3820a690a03c5aa429",
"0x145c5dad6033a1de0930dc1ec9ae107fc61f43bc",
"0x821d0fcf5643c18c663c8960bf79fdbc9f6d0a01",
"0x9b3dcd99eec7fe11602e6534e6302c0f318d7422",
"0xee613b3fc183ee44f9da9c05f53e2da107e3debf",
"0xc35049bc7b6bd28a49a40b261466ca91aad63669",
"0x31519628fb5e5aa559d4ba27aa1248810b9f0977",
"0x204f72f35326db932158cba6adff0b9a1da95e14",
"0x212954857f5efc138748c33d032a93bf95974222"
  ],
  Finance: [
"0x63d43bbb87f85af03b8f2f9e2fad7b54334fa2f1",
"0x42f1ce163f941d7ba0cd12c501c11a4751794a12",
"0xcb23c6b2b6f32ebd9da42ae0b9a1226a81bbac05",
"0x18ff512c3cd1c3409ade28589608eb4268cfe862",
"0xc610d1bc1edbe4e0605e2776eef7c47ee433707a",
"0xe8dd7741ccb12350957ec71e9ee332e0d1e6ec86",
"0xcd71fd5370880f3d92bb941e628c05840fe0d127",
"0x83a296505eb520c9d35823571204ced41fd69452",
"0xf40a40f7a4d6fdff0e2a8518d52621eaee353bce",
"0x9256dc04d6a9af8410c253bb5c52a8ff6eb62e8b",
"0x0c0e270cf879583d6a0142fc817e05b768d0434e",
"0xd218e474776403a330142299f7796e8ba32eb5c9",
"0xd06f0f7719df1b3b75b607923536b3250825d4a6",
"0xf7bd9f758e100426a134ebf6d7f0b2eec90f2a37",
"0xf26be13a36766f46b2c4ed3c97f9f535f776f820",
"0x5b9115312cb4fc2b2b57c65045e611092f222709",
"0x97b333bf95c5a9d79c5534eda96a3e98c63b9031",
"0x2e4d05beafd81a6e85bc0c6a94820d61ef34f703",
"0xedff8b800b7cc7bd8a6c6b637962c7baa3887218"
  ],
  Crypto: [
"0xf705fa045201391d9632b7f3cde06a5e24453ca7",
"0xb85e5c96b0fa57aa9d5ce7ca6ea72409034b6e0f",
"0xdb32d3d83ec2638be539f768e31a3cc89250b646",
"0xcc500cbcc8b7cf5bd21975ebbea34f21b5644c82",
"0x6a7d898b1be25e6799bc802fc539ccf1c0b81f87",
"0xb68a63d94676c8630eb3471d82d3d47b7533c568",
"0xe9c6312464b52aa3eff13d822b003282075995c9",
"0x21504551452f4c4b67a1fbee6ba743a611cdba16",
"0x0f863d92dd2b960e3eb6a23a35fd92a91981404e",
"0x6031b6eed1c97e853c6e0f03ad3ce3529351f96d",
"0x1626dd91e21416752e72895126fcbdcfe9b585b7",
"0x624eab15b2d9be3188cf453cd5dff01847c403fd",
"0xd5f52231d2af24bba8021dbd102c2bddfbefea4e",
"0xca85f4b9e472b542e1df039594eeaebb6d466bf2",
"0x0d32e5fc366d846bbca8a82c6d60a6dd718b6336",
"0x9066aa36696ef7ad9efbf35ea2b2b5535197c20a",
"0x1fd50e9298ab99e6e427a2a3363bff480657cf04",
"0xb2208f8dfbcf01f9ac1cf6639f5e07b7e02005ca"
  ],
  Geopolitics: [], // Assuming empty as not provided
  Earnings: [], // Assuming empty as not provided
  Tech: [
"0xc2a37f1eb84fcc156c8aece9105dc1a73a36c3a6",
"0xedc0f2cd1743914c4533368e15489c1a7a3d99f3",
"0x8795bcb2fe129d1ea3e3d73bc13a3d8078047544",
"0xc851cd9bee7d262afd78674f861f9f576a12cd2a",
"0x9256dc04d6a9af8410c253bb5c52a8ff6eb62e8b",
"0xee50a31c3f5a7c77824b12a941a54388a2827ed6",
"0x510904c9a58f5c5ad799a1b44947077564175e9c",
"0x75e765216a57942d738d880ffcda854d9f869080",
"0xf04f419b9f5d031f32ae068375e1e802f4c7defb",
"0x22e4248bdb066f65c9f11cd66cdd3719a28eef1c",
"0x70f0cc6e84e56c18ec8bd17e8cf9a4b63856d75a",
"0x0641736388a79e335c94f64d31c289ba44444dcf",
"0xdba78eaec18da2455d4b78de38828c2d91f0ae61",
"0x3c593aeb73ebdadbc9ce76d4264a6a2af4011766",
"0xa02febf8d14fe860272f8462c56b61a8f204e4b1",
"0xe41923ce5451c6b7b6ffe30ebda24c0e88ca5839",
"0xa3141724ab6e62564c25040465a954cf1a59e2c5",
"0xdf6da574f8b0c0ce5e01ddb1c5a49b87993e9c5c",
"0xf0ed9e68e6cd3ee712260abeaec32de56a7d47d8"
  ],
  Culture: [
"0x53bffcbff36055113b8775ae488e9bda0988bc10",
"0x43372356634781eea88d61bbdd7824cdce958882",
"0xbb04b974dd6c8a1138833de3a3dcc20d022aec13",
"0x47c1c4d166c200e5455fca85d3b8f155f8f3825f",
"0xd0394bd0de8d901c3fde039a86bf08e6aa4a2532",
"0x7e35a2a8cfd1eb1e69dacd043206db5a787f1a6c",
"0x9d84ce0306f8551e02efef1680475fc0f1dc1344",
"0x06dcaa14f57d8a0573f5dc5940565e6de667af59",
"0x06ecb7e739f5455922ce57e83284f132c7f0f845",
"0xf0d9af9effd0b4a039899901ba19a05ea1a3e4ee",
"0xc2a37f1eb84fcc156c8aece9105dc1a73a36c3a6",
"0x727ce5a21141f48f1a23f67820c1ca7c085815a2",
"0x033dc6e3e3e0a3ae55402576990392ae910aaf05",
"0xecb14ac6e9ca447ce2f2912e6217b43d7b655da3",
"0x2034cebc6dbce25870a695ac54ca0604d83d8dae",
"0x090a0d3fc9d68d3e16db70e3460e3e4b510801b4",
"0x766e6a0a9c36e603dd0e8b35bede1b70fa3562ef",
"0x437c54031fa45db31ac75a0b7f2241bcc81edfa4",
"0xa4da7cb218c5dcb36666815c6aa043890fa82db1"
  ],
  WorldEconomy: [
"0x946945d4ccf06b7c7e2acb35aaab4ae76c6f6d18",
"0x63d43bbb87f85af03b8f2f9e2fad7b54334fa2f1",
"0xf7bd9f758e100426a134ebf6d7f0b2eec90f2a37",
"0xc8ab97a9089a9ff7e6ef0688e6e591a066946418",
"0xe8dd7741ccb12350957ec71e9ee332e0d1e6ec86",
"0xd218e474776403a330142299f7796e8ba32eb5c9",
"0x509587cbb541251c74f261df3421f1fcc9fdc97c",
"0xfcfdf46f992f502a5e55ef55149cf1a6b703d183",
"0x9d84ce0306f8551e02efef1680475fc0f1dc1344",
"0xc02147dee42356b7a4edbb1c35ac4ffa95f61fa8",
"0x51373c6b56e4a38bf97c301efbff840fc8451556",
"0x7e507842c280238a62301146a592a27486d82a28",
"0xe5c215ac428d4143f9ebc817c9ac6e717a2e2ab0",
"0xcd91a549956854fdc38efad7e80ff5da8f5432b8"
  ],
  ElectionsMentions: [
"0xa66b080eab39be2f9b3aef5721883160f8e94882",
"0xf7bd9f758e100426a134ebf6d7f0b2eec90f2a37",
"0xb3732377224de602463c887200d82932b461c8b0",
"0x3b4484b6c8cbfdaa383ba337ab3f0d71055e264e",
"0x27b820e5203aa114acc2712e0e1d0ad758abb68c",
"0x2853240a0f4e9e11a949a5cfa6e0fe953a293482",
"0xdca6e5812a92a7f5d0d1317f916e86ef21b49a97",
"0x17d60b530b0999e04097eefe601ce3a66094e3ed",
"0xe9c24f9949c7a6747129fac381a7b52849132cfb",
"0xad89f899f1524533adfd1e6a07da692fcd92f6e1",
"0x50cec5373b9a22ac5fbe33621a3d4d646598bae7",
"0x75e765216a57942d738d880ffcda854d9f869080",
"0x17105a9bc5de23fef10029ae3f4d41e8fd4a3344",
"0x0cb10c40b0776e9ee8cef970af85724654dda76c",
"0x134a63b764ac7b008356e8db1857db94e6b09e42",
"0xedf67cfe47ecbeda70c7025de60ac9a2e61fcf40",
"0x9ba43501360dcacaca09caa523401c7447d8f8c2",
"0xfee85e605af235b4e75cc40787a2623577c64bd3"
  ],
  Weather: [
"0x0f37cb80dee49d55b5f6d9e595d52591d6371410",
"0xd8f8c13644ea84d62e1ec88c5d1215e436eb0f11",
"0x8278252ebbf354eca8ce316e680a0eaf02859464",
"0xd9243cdacc97a43386dab43082a3fd0d691e7523",
"0xf2f6af4f27ec2dcf4072095ab804016e14cd5817",
"0xcbbc5e035504421b084ad9248b660f6e9618b5d0",
"0x118689b24aead1d6e9507b8068d056b2ec4f051b",
"0x56f246f76ead6d13edfd9d247a4783d3c23d1131",
"0x906f2454a777600aea6c506247566decef82371a",
"0x50936370f48b7c7f87016ae8ec1462d0200a272c",
"0x8bad0e57ff8b8ec449f3611e2735e9ab860cb337",
"0x6f46821c6f3f395725e59009c19f1183d6181bba",
"0xa49b6ea0a604c581f2a9569db42c192b1c487054",
"0x220ce36c47fa467152b3bd8d431af74f232243c8",
"0x946945d4ccf06b7c7e2acb35aaab4ae76c6f6d18",
"0x50ee71e70e52fe8a8bf37009fadeba98395ef581"
  ],
  Whales: [] // Assuming empty as not provided
};

const ALL_WALLETS = [...new Set(Object.values(CATEGORIES).flat().filter(wallet => wallet))]; // Unique list, excluding 'All'

function App() {
  const [trades, setTrades] = useState([]);
  const [filteredTrades, setFilteredTrades] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('desc');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isLoading, setIsLoading] = useState(true);

  const fetchTradesForWallet = async (wallet) => {
    const oneHourAgo = Math.floor(Date.now() / 1000) - 3600;
    const path = `/activity?user=${wallet}&type=TRADE&start=${oneHourAgo}&limit=500&sortBy=TIMESTAMP&sortDirection=DESC`;
    try {
      const response = await axios.get(`${API_BASE_URL}${path}`);
      return response.data || [];
    } catch (error) {
      console.error(`Error fetching for ${wallet}:`, error);
      return [];
    }
  };

  const fetchAllTrades = async () => {
    setIsLoading(true);
    const walletsToFetch = selectedCategory === 'All' ? ALL_WALLETS : CATEGORIES[selectedCategory];
    const allTrades = await Promise.all(walletsToFetch.map(fetchTradesForWallet));
    const combinedTrades = allTrades.flat();
    setTrades(combinedTrades);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchAllTrades();
    const interval = setInterval(fetchAllTrades, 300000); // Every 5 minutes
    return () => clearInterval(interval);
  }, [selectedCategory]); // Refetch when category changes

  useEffect(() => {
    let results = trades.filter(trade =>
      (trade.proxyWallet.toLowerCase().includes(searchTerm.toLowerCase()) ||
       trade.title.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    results.sort((a, b) => {
      const timeA = a.timestamp;
      const timeB = b.timestamp;
      return sortOrder === 'desc' ? timeB - timeA : timeA - timeB;
    });
    setFilteredTrades(results);
  }, [searchTerm, trades, sortOrder]);

  const toggleSort = () => {
    setSortOrder(prev => prev === 'desc' ? 'asc' : 'desc');
  };

  return (
    <div className="min-h-screen bg-gray-900 p-4 flex">
      <div className="w-1/5 p-4 bg-gray-800 rounded-lg mr-4">
        <h2 className="text-xl font-bold mb-4">Categories</h2>
        <ul>
          {Object.keys(CATEGORIES).map(cat => (
            <li key={cat} className="mb-2">
              <button
                onClick={() => setSelectedCategory(cat)}
                className={`w-full text-left p-2 rounded ${selectedCategory === cat ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'}`}
              >
                {cat}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="w-4/5">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold">Polymarket Screener</h1>
          <p className="text-gray-400">Monitoring bets for {selectedCategory} category (last hour, updates every 5 min)</p>
        </header>
        <div className="max-w-full mx-auto">
          <input
            type="text"
            placeholder="Search by address or market..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full p-2 mb-4 bg-gray-800 text-white border border-gray-700 rounded"
          />
          <table className="w-full table-auto border-collapse text-sm overflow-x-auto block md:table">
            <thead>
              <tr className="bg-gray-800 text-gray-300">
                <th className="p-2 text-left">Address</th>
                <th className="p-2 text-left">Direct Link</th>
                <th className="p-2 text-left">Open/Close</th>
                <th className="p-2 text-left">Bet Placed</th>
                <th className="p-2 text-left">How Much</th>
                <th className="p-2 text-left cursor-pointer" onClick={toggleSort}>
                  When {sortOrder === 'desc' ? '↓' : '↑'}
                </th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr><td colSpan="6" className="p-2 text-center">Loading...</td></tr>
              ) : filteredTrades.length === 0 ? (
                <tr><td colSpan="6" className="p-2 text-center">No bets found in the last hour for this category.</td></tr>
              ) : (
                filteredTrades.map((trade, index) => (
                  <tr key={index} className="border-b border-gray-700 hover:bg-gray-800">
                    <td className="p-2">{trade.proxyWallet.slice(0, 6)}...{trade.proxyWallet.slice(-4)}</td>
                    <td className="p-2">
                      <a href={`https://polymarket.com/event/${trade.eventSlug}`} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                        {trade.title.slice(0, 30)}...
                      </a>
                    </td>
                    <td className="p-2">{trade.side === 'BUY' ? 'Open' : 'Close'}</td>
                    <td className="p-2">{trade.outcome}</td>
                    <td className="p-2">${trade.usdcSize.toFixed(2)} USDC</td>
                    <td className="p-2">{formatDistanceToNow(new Date(trade.timestamp * 1000), { addSuffix: true })}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;