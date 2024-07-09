// pages/about.js

import React from "react";
import CreateNFTForm from "../components/CreateNFTForm/CreateNFTForm";

const Create = () => {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "centre",
                alignItems: "centre",
                height: "90vh",
            }}
        >
            <CreateNFTForm />
        </div>
    );
};

export default Create;