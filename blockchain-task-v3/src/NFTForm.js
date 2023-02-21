import React, { useState } from 'react';
import ipfsClient from 'ipfs-http-client';
import { createNFT } from '../utils/contract';

const ipfs = ipfsClient({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https'
});

function NFTForm({ account }) {
    const [file, setFile] = useState(null);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!file) {
            alert('Please select a file to upload');
            return;
        }

        const fileBuffer = await file.arrayBuffer();
        const fileData = new Uint8Array(fileBuffer);
        const result = await ipfs.add(fileData);
        const fileHash = result.path;

        const metadata = JSON.stringify({
            name,
            description,
            image: `https://ipfs.infura.io/ipfs/${fileHash}`
        });

        await createNFT(metadata, account);
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Create a new NFT</h2>
            <div>
                <label htmlFor="file-input">File:</label>
                <input
                    type="file"
                    id="file-input"
                    accept=".jpg,.jpeg,.png,.gif"
                    onChange={(event) => setFile(event.target.files[0])}
                />
            </div>
            <div>
                <label htmlFor="name-input">Name:</label>
                <input
                    type="text"
                    id="name-input"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                />
            </div>
            <div>
                <label htmlFor="description-input">Description:</label>
                <textarea
                    id="description-input"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                />
            </div>
            <button type="submit">Create NFT</button>
        </form>
    );
}

export default NFTForm;
