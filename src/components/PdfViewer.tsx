import React, { useMemo } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
 "pdfjs-dist/build/pdf.worker.min.mjs",
 import.meta.url
).toString();

const options = {
 cMapUrl: "/cmaps/",
 standardFontDataUrl: "/standard_fonts/",
};

// PDFViewer component props type
interface PDFViewerProps {
 fileName: string;
 pageNumber: number;
}

const PDFViewer: React.FC<PDFViewerProps> = React.memo(
 ({ fileName, pageNumber }) => {
  // Constructing the file object with headers
  const token = localStorage.getItem("token"); // Replace this with the actual token
  const fileConfig = useMemo(
   () => ({
    url: `${import.meta.env.VITE_APP_BASE_URL}/proxy/pdf/${fileName}`, // PDF URL
    httpHeaders: {
     token: `${token}`, // Adding the Authorization header
    },
   }),
   [fileName, token]
  );

  // Render PDF document
  return (
   <div className="h-full overflow-y-auto">
    <Document
     className="w-[400px]"
     file={fileConfig} // Providing the fetched PDF data to the Document component
     onLoadSuccess={({ numPages }) => console.log(`Loaded ${numPages} pages`)}
     options={options}
    >
     <Page pageNumber={pageNumber} /> {/* Rendering the current page */}
    </Document>
   </div>
  );
 }
);

export default PDFViewer;
