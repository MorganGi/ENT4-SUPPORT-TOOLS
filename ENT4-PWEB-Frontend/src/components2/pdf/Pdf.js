import { Worker } from "@react-pdf-viewer/core";
import { Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

export default function Pdf({ file }) {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  return (
    <div>
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.14.305/build/pdf.worker.min.js">
        <div
          style={{
            border: "1px solid rgba(0, 0, 0, 0.3)",
            width: "auto",
            height: "800px",
          }}
        >
          <Viewer plugins={[defaultLayoutPluginInstance]} fileUrl={file} />
        </div>
      </Worker>
    </div>
  );
}
