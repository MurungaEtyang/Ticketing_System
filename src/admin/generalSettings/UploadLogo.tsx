import React, { useState } from 'react';

const UploadLogo: React.FC = () => {
    const [logo, setLogo] = useState<File | null>(null);
    const [favicon, setFavicon] = useState<File | null>(null);
    const [logoDataUrl, setLogoDataUrl] = useState<string | null>(null);
    const [faviconDataUrl, setFaviconDataUrl] = useState<string | null>(null);

    const handleLogoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const selectedLogo = event.target.files[0];
            setLogo(selectedLogo);
            const logoReader = new FileReader();
            logoReader.onloadend = () => {
                const logoDataUrl = logoReader.result as string;
                setLogoDataUrl(logoDataUrl);
            };
            logoReader.readAsDataURL(selectedLogo);
        }
    };

    const handleFaviconChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const selectedFavicon = event.target.files[0];
            setFavicon(selectedFavicon);
            const faviconReader = new FileReader();
            faviconReader.onloadend = () => {
                const faviconDataUrl = faviconReader.result as string;
                setFaviconDataUrl(faviconDataUrl);
            };
            faviconReader.readAsDataURL(selectedFavicon);
        }
    };

    const handleUpload = (event: React.FormEvent) => {
        event.preventDefault(); // Prevent the default form submission behavior

        // Upload logo and favicon to the images folder
        if (logo) {
            const logoReader = new FileReader();
            logoReader.onloadend = () => {
                const logoDataUrl = logoReader.result as string;
                const logoFileName = logo.name;
                const logoPath = `../assets/images/${logoFileName}`;

                // Save the logo to local storage
                saveImageToLocalStorage(logoDataUrl, logoPath);

                // Reflect the uploaded logo in the user section
                setLogoDataUrl(logoDataUrl);
            };
            logoReader.readAsDataURL(logo);
        }

        if (favicon) {
            const faviconReader = new FileReader();
            faviconReader.onloadend = () => {
                const faviconDataUrl = faviconReader.result as string;
                const faviconFileName = favicon.name;
                const faviconPath = `../assets/images/${faviconFileName}`;

                // Save the favicon to local storage
                saveImageToLocalStorage(faviconDataUrl, faviconPath);

                // Reflect the uploaded favicon in the user section
                setFaviconDataUrl(faviconDataUrl);
            };
            faviconReader.readAsDataURL(favicon);
        }
    };

    const saveImageToLocalStorage = (dataUrl: string, path: string) => {
        // Save the data URL to local storage
        localStorage.setItem(path, dataUrl);
    };

    return (
        <div>
            <h2>Upload Logo and Favicon</h2>
            <form onSubmit={handleUpload}>
                <div>
                    <label htmlFor="logo">Logo:</label>
                    <input type="file" id="logo" accept="image/*" onChange={handleLogoChange} />
                    {logoDataUrl && <img src={logoDataUrl} alt="Logo Preview" style={{ maxWidth: '200px' }} />}
                </div>
                <div>
                    <label htmlFor="favicon">Favicon:</label>
                    <input type="file" id="favicon" accept="image/*" onChange={handleFaviconChange} />
                    {faviconDataUrl && <img src={faviconDataUrl} alt="Favicon Preview" style={{ maxWidth: '200px' }} />}
                </div>
                <button type="submit">Upload</button>
            </form>
        </div>
    );
};

export default UploadLogo;