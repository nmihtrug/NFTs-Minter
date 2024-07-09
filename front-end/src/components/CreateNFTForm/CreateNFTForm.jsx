// src/components/CreateNFTForm.jsx
import React from 'react';
import './CreateForm.css';

const CreateNFTForm = () => {
  return (
    <div className="form-container">
      <h2>CREATE YOUR OWN NFT</h2>
      <form className="nft-form">
        <div className="form-group">
          <label htmlFor="nft-name">NFT Name *</label>
          <input type="text" id="nft-name" placeholder="Enter NFT Name" />
        </div>
        <div className="form-group">
          <label htmlFor="nft-description">NFT Description *</label>
          <textarea id="nft-description" placeholder="Tell us about your NFT..." />
        </div>
        <div className="form-group">
          <label>Upload Method *</label>
          <div className="upload-options">
            <label>
              <input type="radio" name="upload-method" value="image" defaultChecked />
              Upload Image
            </label>
            <label>
              <input type="radio" name="upload-method" value="ai-prompt" />
              Using AI Prompt (Fee: 0.02 Sol)
            </label>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="upload-image">Upload Image *</label>
          <input type="file" id="upload-image" />
        </div>
        <div className="form-group">
          <label htmlFor="royalty-percentage">Royalty Percentage</label>
          <select id="royalty-percentage">
            <option value="0">0%</option>
            <option value="5">5%</option>
            <option value="10">10%</option>
            <option value="15">15%</option>
          </select>
        </div>
        <p>Fee Create: 0.5 Sol</p>
        <button type="submit" className="create-nft-btn">CREATE NFT</button>
      </form>
    </div>
  );
};

export default CreateNFTForm;
