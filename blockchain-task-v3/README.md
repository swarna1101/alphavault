# Document Verification System with IPFS and ERC-721
This is a basic digital document verification system built using the IPFS (InterPlanetary File System) for document storage and the ERC-721 (NFT) standard for digital document verification. The system includes a website that allows users to upload images to IPFS and create a new NFT (document) from the uploaded image, as well as a MetaMask wallet integration to provide wallet access for creating a new NFT.

## Requirements
1. Node.js
2. Truffle
3. MetaMask (or another compatible Web3 wallet)
4. IPFS (if you're not using a public IPFS gateway)

## Usage

1. Upload an image by clicking the "Choose File" button and selecting an image file. Enter a name and description for the document.
2. Click "Upload Image" to upload the image to IPFS and create a new NFT from the uploaded image.
3. Click "View Documents" to view a list of all documents you own.
4. To verify a document, copy the token ID and use it to look up the document on a block explorer such as Etherscan.

## Troubleshooting

1. If you get a "Error: Returned error: insufficient funds" error when trying to create a new NFT, make sure you have enough test ether (ETH) in your MetaMask wallet.
2. If you're running your own IPFS node, make sure it's running and you're connected to it. You can update the IPFS node URL in app.js.
3. If you're using a public IPFS gateway, you may experience slower upload times due to network congestion.