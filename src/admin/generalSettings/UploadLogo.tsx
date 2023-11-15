import React, { useState } from 'react';
import '../stylesheet/uploadLogo.css'

const UploadLogo: React.FC = () => {
    const [logo, setLogo] = useState<File | null>(null);
    const [favicon, setFavicon] = useState<File | null>(null);
    const [logoPreview, setLogoPreview] = useState<string | null>(null);
    const [faviconPreview, setFaviconPreview] = useState<string | null>(null);

    const handleLogoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const selectedLogo = event.target.files[0];
            setLogo(selectedLogo);
            setLogoPreview(URL.createObjectURL(selectedLogo));
        }
    };

    const handleFaviconChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const selectedFavicon = event.target.files[0];
            setFavicon(selectedFavicon);
            setFaviconPreview(URL.createObjectURL(selectedFavicon));
        }
    };

    const handleUpload = () => {
        // Upload logo and favicon to the server
        if (logo) {
            // Upload logo
            // ...
        }

        if (favicon) {
            // Upload favicon
            // ...
        }

        // Reflect the uploaded logo and favicon in the user section
        // ...
    };

    return (
        <div>
            <h2>Upload Logo and Favicon</h2>
            <div>
                <label htmlFor="logo">Logo:</label>
                <input type="file" id="logo" accept="image/*" onChange={handleLogoChange} />
                {logoPreview && <img src={logoPreview} alt="Logo Preview" style={{ maxWidth: '200px' }} />}
            </div>
            <div>
                <label htmlFor="favicon">Favicon:</label>
                <input type="file" id="favicon" accept="image/*" onChange={handleFaviconChange} />
                {faviconPreview && <img src={faviconPreview} alt="Favicon Preview" style={{ maxWidth: '200px' }} />}
            </div>
            <button onClick={handleUpload}>Upload</button>
        </div>
    );
};

export default UploadLogo;