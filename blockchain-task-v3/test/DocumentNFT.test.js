const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('DocumentNFT', function () {
    let DocumentNFT;
    let documentNFT;
    let owner;
    let addr1;
    let addr2;

    beforeEach(async function () {
        [owner, addr1, addr2] = await ethers.getSigners();
        DocumentNFT = await ethers.getContractFactory('DocumentNFT');
        documentNFT = await DocumentNFT.deploy();
        await documentNFT.deployed();
    });

    describe('createDocument', function () {
        it('creates a new document NFT', async function () {
            const name = 'Test Document';
            const description = 'This is a test document';
            const image = 'https://example.com/test.jpg';
            const metadata = JSON.stringify({ name, description, image });

            await expect(documentNFT.createDocument(metadata))
                .to.emit(documentNFT, 'Transfer')
                .withArgs(ethers.constants.AddressZero, owner.address, 1);

            const document = await documentNFT.getDocument(1);
            expect(document.name).to.equal(name);
            expect(document.description).to.equal(description);
            expect(document.image).to.equal(image);
            expect(document.owner).to.equal(owner.address);
        });

        it('reverts if metadata is not a valid JSON string', async function () {
            const invalidMetadata = 'not valid JSON';

            await expect(documentNFT.createDocument(invalidMetadata)).to.be.revertedWith(
                'DocumentNFT: invalid metadata'
            );
        });

        it('reverts if not called by the contract owner', async function () {
            const name = 'Test Document';
            const description = 'This is a test document';
            const image = 'https://example.com/test.jpg';
            const metadata = JSON.stringify({ name, description, image });

            await expect(documentNFT.connect(addr1).createDocument(metadata)).to.be.revertedWith(
                'Ownable: caller is not the owner'
            );
        });
    });
});
