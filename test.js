// components/UploadProduk.jsx
import { useState } from 'react';

export default function UploadProduk() {
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('image', file);

    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData
    });
    alert("Produk berhasil masuk katalog!");
  };

  return (
    <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg">
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload} className="bg-blue-500 text-white p-2 mt-2">
        Unggah ke Katalog
      </button>
    </div>
  );
}
