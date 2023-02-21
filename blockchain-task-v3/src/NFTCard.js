import React from 'react';

function NFTCard({ nft }) {
    return (
        <div>
            <img src={nft.image} alt={nft.name} />
            <h3>{nft.name}</h3>
            <p>{nft.description}</p>
            <p>Token ID: {nft.tokenId}</p>
        </div>
    );
}

export default NFTCard;
