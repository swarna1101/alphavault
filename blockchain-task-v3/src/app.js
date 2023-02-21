const ipfsClient = require('ipfs-http-client');
const Web3 = require('web3');
const DocumentNFT = require('./build/contracts/DocumentNFT.json');

// Connect to IPFS node
const ipfs = ipfsClient({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https'
});

// Connect to Ethereum network using Web3 and Metamask
window.addEventListener('load', async () => {
    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
    } else {
        alert('Please install Metamask to use this dApp');
    }

    // Load the contract instance
    const networkId = await window.web3.eth.net.getId();
    const contractData = DocumentNFT.networks[networkId];
    if (!contractData) {
        alert('Contract not found on this network');
        return;
    }
    const contract = new window.web3.eth.Contract(
        DocumentNFT.abi,
        contractData.address
    );

    // Load the connected wallet balance
    const account = (await window.web3.eth.getAccounts())[0];
    const balance = await window.web3.eth.getBalance(account);
    const balanceInEth = window.web3.utils.fromWei(balance, 'ether');
    const balanceText = `Balance: ${balanceInEth} ETH`;
    document.getElementById('balance').innerText = balanceText;

    // Handle form submission
    const form = document.getElementById('upload-form');
    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const fileInput = document.getElementById('file-input');
        const file = fileInput.files[0];
        if (!file) {
            alert('Please select a file to upload');
            return;
        }

        const fileBuffer = await file.arrayBuffer();
        const fileData = new Uint8Array(fileBuffer);
        const result = await ipfs.add(fileData);
        const fileHash = result.path;

        const nameInput = document.getElementById('name-input');
        const name = nameInput.value || file.name;

        const descriptionInput = document.getElementById('description-input');
        const description = descriptionInput.value || '';

        // Create a new NFT for the uploaded file
        const metadata = JSON.stringify({
            name,
            description,
            image: `https://ipfs.infura.io/ipfs/${fileHash}`
        });
        const tokenId = await contract.methods.createNFT(metadata).send({
            from: account
        });

        alert(`New NFT created with token ID: ${tokenId}`);
    });
});
