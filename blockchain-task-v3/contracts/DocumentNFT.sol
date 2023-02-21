// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract DocumentNFT is ERC721 {
    uint256 private tokenId = 0;
    mapping (uint256 => string) private _tokenURIs;

    constructor(string memory name_, string memory symbol_)
    ERC721(name_, symbol_)
    {}

    function createNFT(address owner, string memory tokenURI) external returns (uint256) {
        tokenId++;
        _safeMint(owner, tokenId);
        _setTokenURI(tokenId, tokenURI);
        return tokenId;
    }

    function _setTokenURI(uint256 tokenId, string memory tokenURI) internal virtual {
        require(_exists(tokenId), "ERC721Metadata: URI set of nonexistent token");
        _tokenURIs[tokenId] = tokenURI;
    }

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");
        return _tokenURIs[tokenId];
    }
}
