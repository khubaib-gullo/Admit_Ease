// import React, { useState } from 'react';
// import DocumentUpload from '../Uploads'; // Assuming DocumentUpload is in the same directory
// import { GoogleGenAI, createUserContent, Part } from "@google/genai";

// const ai = new GoogleGenAI({ apiKey: "YOUR_GOOGLE_API_KEY" });

// function MyFormComponent() {
//     const [uploading, setUploading] = useState(false);

//     const handleFileSelected = async (base64Data: string | null, mimeType: string, documentType: string) => {
//         if (base64Data && mimeType) {
//             setUploading(true);
//             try {
//                 const imagePart: Part = {
//                     inlineData: {
//                         data: base64Data,
//                         mimeType: mimeType,
//                     },
//                 };

//                 const response = await ai.models.generateContent({
//                     model: "gemini-2.0-flash",
//                     contents: createUserContent([
//                         imagePart,
//                         `Process this ${documentType} image and extract relevant information.`,
//                     ]),
//                 });

//                 console.log("API Response:", response.text);
//                 // Handle the API response (e.g., update state, display results)
//             } catch (error) {
//                 console.error("API Error:", error);
//                 // Handle the error
//             } finally {
//                 setUploading(false);
//             }
//         } else {
//             console.log(`No image data to send for ${documentType}`);
//             // Handle cases where base64Data is null (non-image/pdf or error)
//         }
//     };

//     return (
//         <div>
//             <h2>Upload Documents</h2>
//             <DocumentUpload onFileSelect={handleFileSelected} isPending={uploading} />
//             {uploading && <p>Processing...</p>}
//             {/* ... other form elements and logic ... */}
//         </div>
//     );
// }

// export default MyFormComponent;