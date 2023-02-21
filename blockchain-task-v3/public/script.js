const ipfs = window.IpfsHttpClient({ host: "ipfs.infura.io", port: 5001, protocol: "https" });
const web3 = new window.Web3(window.ethereum);

const contractAddress = "<YOUR_CONTRACT_ADDRESS>";
const contractABI = <YOUR_CONTRACT_ABI>;

    const contract = new web3.eth.Contract(contractABI, contractAddress);

    window.ethereum.enable().then(() => {
        web3.eth.getAccounts().then((accounts) => {
            const account = accounts[0];
            document.getElementById("wallet-address").innerHTML = account;

            web3.eth.getBalance(account, (error, balance) => {
                if (error) {
                    console.error(error);
                } else {
                    document.getElementById("wallet-balance").innerHTML = web3.utils.fromWei(balance, "ether") + " ETH";
                }
            });
        });
    });

    document.getElementById("upload-form").addEventListener("submit", async (event) => {
        event.preventDefault();

        const file = event.target.elements.file.files[0];
        const fileReader = new FileReader();

        fileReader.onload = async () => {
        const fileBuffer = await ipfs.add(fileReader.result);
        const tokenURI = `https://ipfs.io/ipfs/${fileBuffer.path}`;

        contract.methods.createNFT(web3.eth.defaultAccount, tokenURI).send({ from: web3.eth.defaultAccount }, (error, transactionHash) => {
        if (error) {
        console.error(error);
    } else {
        console.log(transactionHash);
        document.getElementById("token-uri").value = "";
        alert("NFT minted successfully!");
    }
    });
    };

        fileReader.readAsArrayBuffer(file);
    });
