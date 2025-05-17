import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import {
  Upload,
  FileIcon,
  FilePlus2,
  X,
  CheckCircle2,
  FileText,
  BookOpen,
  CreditCard,
  File,

} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";

interface DocumentFile {
  file: File;
  previewUrl: string | null;
  type: string;
  base64Data: string | null; // To store base64 encoded image data

}

interface DocumentUploadProps {
  // onFileSelect: (file: File, documentType: string) => void;
  onImageSelected: (base64Data: string, mimeType: string, documentType: string) => Promise<void> | void; // Modified onFileSelect
  isPending: boolean;
}


const DocumentUpload: React.FC<DocumentUploadProps> = ({
  onImageSelected,
  isPending,
  
}) => {
  const [files, setFiles] = useState<Record<string, DocumentFile | null>>({
    idCard: null,
    bForm: null,
    // domicile: null,
    matricResult: null,
    fscResult: null,
    // other: null,
  });

  const [activeTab, setActiveTab] = useState("idCard");
  const [uploadSuccess, setUploadSuccess] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);



      const handleDrop = useCallback(
          async (acceptedFiles: File[], documentType: string) => {
              if (acceptedFiles && acceptedFiles.length > 0) {
                  const selectedFile = acceptedFiles[0];
                  let previewUrl: string | null = null;
                  let base64Data: string | null = null;

                  if (selectedFile.type.startsWith("image/")) {
                      previewUrl = URL.createObjectURL(selectedFile);
                      const reader = new FileReader();
                      reader.onload = async () => {
                          base64Data = reader.result as string;
                          setFiles((prev) => ({ ...prev, [documentType]: { file: selectedFile, previewUrl, type: documentType, base64Data } }));
                          setUploadSuccess(documentType);
                          setTimeout(() => setUploadSuccess(null), 2000);
                          await onImageSelected(base64Data.split(',')[1], selectedFile.type, documentType);
                      };
                      reader.readAsDataURL(selectedFile);
                  } else if (selectedFile.type === "application/pdf") {
                      const reader = new FileReader();
                      reader.onload = async () => {
                          base64Data = reader.result as string;
                          setFiles((prev) => ({ ...prev, [documentType]: { file: selectedFile, previewUrl: null, type: documentType, base64Data } }));
                          setUploadSuccess(documentType);
                          setTimeout(() => setUploadSuccess(null), 2000);
                          await onImageSelected(base64Data.split(',')[1], selectedFile.type, documentType);
                      };
                      reader.readAsDataURL(selectedFile);
                  } else {
                      // Handle other file types without calling onFileSelect with base64Data
                      setFiles((prev) => ({ ...prev, [documentType]: { file: selectedFile, previewUrl: null, type: documentType, base64Data: null } }));
                      setUploadSuccess(documentType);
                      setTimeout(() => setUploadSuccess(null), 2000);
                      // You might want to have a different callback for other file types
                      // or handle them in the parent component based on the documentType.
                      console.log(`Non-image/PDF file selected for ${documentType}:`, selectedFile);
                  }
              }
          },
          [onImageSelected]
      );

  const getDropzone = (documentType: string) => {
    const { getRootProps, getInputProps, isDragActive, isDragReject } =
      useDropzone({
        onDrop: (acceptedFiles) => handleDrop(acceptedFiles, documentType),
        accept: {
          "image/*": [".jpeg", ".jpg", ".png"],
          "application/pdf": [".pdf"],
        },
        maxFiles: 1,
        disabled: isPending,
        onDragEnter: () => setDragActive(true),
        onDragLeave: () => setDragActive(false),
      });

    return { getRootProps, getInputProps, isDragActive, isDragReject };
  };

  const removeFile = (documentType: string) => {
    setFiles((prev) => ({
      ...prev,
      [documentType]: null,
    }));
  };

  const getDocumentIcon = (documentType: string) => {
    switch (documentType) {
      case "idCard":
        return <CreditCard className="h-5 w-5 text-university-600 mr-2" />;
      case "bForm":
        return <FileText className="h-5 w-5 text-university-600 mr-2" />;
      // case "domicile":
      //   return <FileCheck className="h-5 w-5 text-university-600 mr-2" />;
      case "matricResult":
        return <BookOpen className="h-5 w-5 text-university-600 mr-2" />;
      case "fscResult":
        return <BookOpen className="h-5 w-5 text-university-600 mr-2" />;
      // default:
      //   return <FileIcon className="h-5 w-5 text-university-600 mr-2" />;
    }
  };

  const getDocumentTitle = (documentType: string) => {
    switch (documentType) {
      case "idCard":
        return "CNIC/ID Card";
      case "bForm":
        return "B-Form";
      // case "domicile":
      //   return "Domicile Certificate";
      case "matricResult":
        return "Matriculation Result";
      case "fscResult":
        return "FSc/Intermediate Result";
    }
  };

  const renderDropzone = (documentType: string) => {
    const { getRootProps, getInputProps, isDragActive, isDragReject } =
      getDropzone(documentType);
    const file = files[documentType];

    return (
      <div
        {...getRootProps()}
        className={cn(
          "glass rounded-xl p-6 text-center border-2 border-dashed transition-all duration-300 h-64",
          isDragActive
            ? "border-university-500 bg-university-50/30 scale-[1.02]"
            : "border-gray-300",
          dragActive &&
            "border-university-500 bg-university-50/30 scale-[1.02]",
          isDragReject && "border-red-500 bg-red-50/30",
          isPending && "opacity-60 cursor-not-allowed",
          file && "scale-on-hover"
        )}
        onDragEnter={() => setDragActive(true)}
        onDragLeave={() => setDragActive(false)}
      >
        <input {...getInputProps()} />

        {!file ? (
          <div className="space-y-4 h-full flex flex-col justify-center items-center">
            <div className="flex justify-center">
              <Upload
                className={cn(
                  "h-12 w-12 text-university-500",
                  isDragActive ? "animate-pulse" : "animate-bounce-subtle"
                )}
              />
            </div>
            <div>
              <p className="font-medium text-gray-700">
                Upload {getDocumentTitle(documentType)}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Drag & drop or click to browse
              </p>
            </div>
            <button
              type="button"
              className={cn(
                "mt-4 glass-button-secondary inline-flex items-center group",
                isPending && "cursor-not-allowed opacity-60"
              )}
              disabled={isPending}
            >
              <FilePlus2 className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
              <span>Select File</span>
            </button>
          </div>
        ) : (
          <div className="relative h-full flex flex-col justify-center items-center">
            {!isPending && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeFile(documentType);
                }}
                className="absolute -top-3 -right-3 bg-white rounded-full p-1 shadow-md hover:bg-gray-100 transition-colors hover:rotate-90 duration-300"
              >
                <X className="h-4 w-4 text-gray-700" />
              </button>
            )}

            <div className="py-3 flex flex-col items-center justify-center h-full">
              {uploadSuccess === documentType && (
                <div className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-lg z-10 animate-fade-in">
                  <div className="flex flex-col items-center">
                    <CheckCircle2 className="h-16 w-16 text-green-500 animate-pulse mb-2" />
                    <p className="font-medium text-gray-800">
                      Document uploaded successfully!
                    </p>
                    <p className="text-sm text-gray-600">
                      Processing for auto-fill...
                    </p>
                  </div>
                </div>
              )}

              {file.previewUrl ? (
                <div className="flex justify-center mb-4">
                  <img
                    src={file.previewUrl}
                    alt={`${getDocumentTitle(documentType)} preview`}
                    className="max-h-36 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                  />
                </div>
              ) : (
                <div className="flex justify-center mb-4">
                  {file.file.type === "application/pdf" ? (
                    <FileText className="h-16 w-16 text-university-600 animate-pulse-slow" />
                  ) : (
                    <File className="h-16 w-16 text-university-600 animate-pulse-slow" />
                  )}
                </div>
              )}

              <p className="font-medium text-gray-700">{file.file.name}</p>
              <p className="text-sm text-gray-500">
                {(file.file.size / 1024 / 1024).toFixed(2)} MB
              </p>

              <div className="mt-2 flex justify-center">
                <div className="px-3 py-1 bg-university-100 text-university-800 rounded-full text-xs font-medium inline-flex items-center">
                  <CheckCircle2 className="h-3 w-3 mr-1" />
                  Ready for OCR processing
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="mb-8 fade-in">
      <div className="flex items-center mb-2">
        <FileIcon className="h-5 w-5 text-university-600 mr-2" />
        <h3 className="text-lg font-semibold text-gray-800">
          Document Upload & Auto-Fill
        </h3>
      </div>

      {/* <p className="text-sm text-gray-600 mb-4">
        Upload your documents to automatically fill in relevant information. We
        support Pakistani documents like CNIC, B-Form, Domicile certificates,
        and educational certificates.
      </p> */}

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 md:grid-cols-6 mb-6">
          <TabsTrigger
            value="idCard"
            className="text-xs md:text-sm flex items-center gap-1"
          >
            <CreditCard className="h-3.5 w-3.5" />
            <span className="hidden md:inline">ID Card</span>
          </TabsTrigger>
          <TabsTrigger
            value="bForm"
            className="text-xs md:text-sm flex items-center gap-1"
          >
            <FileText className="h-3.5 w-3.5" />
            <span className="hidden md:inline">B-Form</span>
          </TabsTrigger>
          {/* <TabsTrigger
            value="domicile"
            className="text-xs md:text-sm flex items-center gap-1"
          >
            <FileCheck className="h-3.5 w-3.5" />
            <span className="hidden md:inline">Domicile</span>
          </TabsTrigger> */}
          <TabsTrigger
            value="matricResult"
            className="text-xs md:text-sm flex items-center gap-1"
          >
            <BookOpen className="h-3.5 w-3.5" />
            <span className="hidden md:inline">Matric</span>
          </TabsTrigger>
          <TabsTrigger
            value="fscResult"
            className="text-xs md:text-sm flex items-center gap-1"
          >
            <BookOpen className="h-3.5 w-3.5" />
            <span className="hidden md:inline">FSc/Inter</span>
          </TabsTrigger>
          {/* <TabsTrigger
            value="other"
            className="text-xs md:text-sm flex items-center gap-1"
          >
            <FileIcon className="h-3.5 w-3.5" />
            <span className="hidden md:inline">Other</span>
          </TabsTrigger> */}
        </TabsList>

        <TabsContent value="idCard" className="mt-0">
          <div className="flex items-center mb-2">
            {getDocumentIcon("idCard")}
            <h4 className="text-md font-medium text-gray-700">CNIC/ID Card</h4>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Upload your CNIC to automatically fill personal information like
            name, father's name, date of birth, etc.
          </p>
          {renderDropzone("idCard")}
        </TabsContent>

        <TabsContent value="bForm" className="mt-0">
          <div className="flex items-center mb-2">
            {getDocumentIcon("bForm")}
            <h4 className="text-md font-medium text-gray-700">B-Form</h4>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Upload your B-Form if you don't have a CNIC yet. This will auto-fill
            your basic information.
          </p>
          {renderDropzone("bForm")}
        </TabsContent>

        {/* <TabsContent value="domicile" className="mt-0">
          <div className="flex items-center mb-2">
            {getDocumentIcon("domicile")}
            <h4 className="text-md font-medium text-gray-700">
              Domicile Certificate
            </h4>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Upload your domicile certificate to automatically fill your
            permanent address and domicile information.
          </p>
          {renderDropzone("domicile")}
        </TabsContent> */}

        <TabsContent value="matricResult" className="mt-0">
          <div className="flex items-center mb-2">
            {getDocumentIcon("matricResult")}
            <h4 className="text-md font-medium text-gray-700">
              Matriculation Result
            </h4>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Upload your Matric result card or certificate to auto-fill your
            academic information.
          </p>
          {renderDropzone("matricResult")}
        </TabsContent>

        <TabsContent value="fscResult" className="mt-0">
          <div className="flex items-center mb-2">
            {getDocumentIcon("fscResult")}
            <h4 className="text-md font-medium text-gray-700">
              FSc/Intermediate Result
            </h4>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Upload your FSc/Intermediate result card to auto-fill your higher
            secondary education details.
          </p>
          {renderDropzone("fscResult")}
        </TabsContent>

        {/* <TabsContent value="other" className="mt-0">
          <div className="flex items-center mb-2">
            {getDocumentIcon("other")}
            <h4 className="text-md font-medium text-gray-700">
              Other Documents
            </h4>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Upload any other supporting documents that may be required for your
            application.
          </p>
          {renderDropzone("other")}
        </TabsContent> */}
      </Tabs>
    </div>
  );
};

export default DocumentUpload;



// ##################
// #############


// import React, { useCallback, useState } from "react";
// import { useDropzone } from "react-dropzone";
// import {
//   Upload,
//   FileIcon,
//   FilePlus2,
//   X,
//   CheckCircle2,
//   AlertCircle,
//   FileText,
//   BookOpen,
//   CreditCard,
//   FileCheck,
//   File,
//   Image, // Import the Image icon
// } from "lucide-react";
// import { cn } from "@/lib/utils";
// import {
//   Tabs,
//   TabsContent,
//   TabsList,
//   TabsTrigger,
// } from "../components/ui/tabs";

// interface DocumentFile {
//   file: File;
//   previewUrl: string | null;
//   type: string;
//   base64Data: string | null; // To store base64 encoded image data
// }

// interface DocumentUploadProps {
//   onImageSelected: (base64Data: string | null, mimeType: string | null) => void; // New prop for image selection
//   isPending: boolean;
// }

// const DocumentUpload: React.FC<DocumentUploadProps> = ({
//   onImageSelected,
//   isPending,
// }) => {
//   const [uploadedImage, setUploadedImage] = useState<DocumentFile | null>(null);
//   const [uploadSuccess, setUploadSuccess] = useState<boolean>(false);
//   const [dragActive, setDragActive] = useState(false);

//   const handleDrop = useCallback(
//     (acceptedFiles: File[]) => {
//       if (acceptedFiles && acceptedFiles.length > 0) {
//         const selectedFile = acceptedFiles[0];

//         if (selectedFile.type.startsWith("image/")) {
//           const reader = new FileReader();
//           reader.onload = () => {
//             const base64Data = reader.result as string;
//             setUploadedImage({
//               file: selectedFile,
//               previewUrl: base64Data,
//               type: "image",
//               base64Data: base64Data.split(',')[1], // Extract the base64 string without the data URL prefix
//             });
//             setUploadSuccess(true);
//             setTimeout(() => setUploadSuccess(false), 2000);
//             onImageSelected(base64Data.split(',')[1], selectedFile.type); // Call the new prop
//           };
//           reader.readAsDataURL(selectedFile);
//         } else {
//           alert("Please upload an image file.");
//         }
//       }
//     },
//     [onImageSelected]
//   );

//   const { getRootProps, getInputProps, isDragActive, isDragReject } =
//     useDropzone({
//       onDrop: handleDrop,
//       accept: {
//         "image/*": [".jpeg", ".jpg", ".png", ".gif"], // Specify accepted image types
//       },
//       maxFiles: 1,
//       disabled: isPending,
//       onDragEnter: () => setDragActive(true),
//       onDragLeave: () => setDragActive(false),
//     });

//   const removeImage = () => {
//     setUploadedImage(null);
//   };

//   return (
//     <div className="mb-8 fade-in">
//       <div className="flex items-center mb-2">
//         <Image className="h-5 w-5 text-university-600 mr-2" /> {/* Use the Image icon */}
//         <h3 className="text-lg font-semibold text-gray-800">
//           Upload Image for Processing
//         </h3>
//       </div>

//       <p className="text-sm text-gray-600 mb-4">
//         Upload an image, and we'll send it to the Gemini API for analysis.
//       </p>

//       <div
//         {...getRootProps()}
//         className={cn(
//           "glass rounded-xl p-6 text-center border-2 border-dashed transition-all duration-300 h-48 flex flex-col justify-center items-center",
//           isDragActive
//             ? "border-university-500 bg-university-50/30 scale-[1.02]"
//             : "border-gray-300",
//           dragActive &&
//             "border-university-500 bg-university-50/30 scale-[1.02]",
//           isDragReject && "border-red-500 bg-red-50/30",
//           isPending && "opacity-60 cursor-not-allowed",
//           uploadedImage && "scale-on-hover cursor-pointer"
//         )}
//         onDragEnter={() => setDragActive(true)}
//         onDragLeave={() => setDragActive(false)}
//         onClick={() => !uploadedImage && document.getElementById("image-upload-input")?.click()} // Trigger file input on click
//       >
//         <input {...getInputProps()} id="image-upload-input" />

//         {!uploadedImage ? (
//           <div className="space-y-4">
//             <div className="flex justify-center">
//               <Upload
//                 className={cn(
//                   "h-12 w-12 text-university-500",
//                   isDragActive ? "animate-pulse" : "animate-bounce-subtle"
//                 )}
//               />
//             </div>
//             <div>
//               <p className="font-medium text-gray-700">
//                 Drag & drop an image here
//               </p>
//               <p className="text-sm text-gray-500 mt-1">
//                 or click to browse
//               </p>
//             </div>
//           </div>
//         ) : (
//           <div className="relative h-full w-full flex items-center justify-center">
//             {!isPending && (
//               <button
//                 onClick={removeImage}
//                 className="absolute -top-3 -right-3 bg-white rounded-full p-1 shadow-md hover:bg-gray-100 transition-colors hover:rotate-90 duration-300"
//               >
//                 <X className="h-4 w-4 text-gray-700" />
//               </button>
//             )}
//             {/* <img
//               src={uploadedImage.previewUrl}
//               alt="Uploaded image preview"
//               className="max-h-full max-w-full rounded-lg shadow-md"
//             /> */}

//         {uploadedImage && uploadedImage.previewUrl && (
//             <img
//               src={uploadedImage.previewUrl}
//               alt="Uploaded image preview"
//               className="max-h-full max-w-full rounded-lg shadow-md"
//             />
//           )}

//             {uploadSuccess && (
//               <div className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-lg z-10 animate-fade-in">
//                 <CheckCircle2 className="h-16 w-16 text-green-500 animate-pulse mb-2" />
//                 <p className="font-medium text-gray-800">Image uploaded!</p>
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default DocumentUpload;