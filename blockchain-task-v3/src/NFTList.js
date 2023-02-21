import React, { useState, useEffect } from 'react';
import { getNFTs } from '../utils/contract';
import NFTCard from './NFTCard';

function NFTList() {
    const [nfts, setNFTs] = useState([]);

    useEffect(() => {
        async function loadNFTs() {
            const loadedNFTs = await getNFTs();
            setNFTs(loadedNFTs);
        }

        loadNFTs();
    }, []);

    return (
        <div>
            <h2>My NFTs</h2>
            {nfts.length > 0 ? (
                <div>
                    {nfts.map((nft) => (
                        <NFTCard key={nft.tokenId} nft={nft} />
                    ))}
                </div>
            ) : (
                <p>No NFTs found</p>
            )}
        </div>
    );
}

export default NFTList;
