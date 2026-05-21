"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  UploadCloud,
  File,
  CheckCircle,
  Loader2,
  AlertCircle
} from "lucide-react";

export default function UploadPage() {

  const [uploadedFiles, setUploadedFiles] = useState<
    {
      name: string;
      status: string;
      error?: string;
    }[]
  >([]);

  const handleDragOver = (
    e: React.DragEvent
  ) => {
    e.preventDefault();
  };

  const handleDrop = (
    e: React.DragEvent
  ) => {

    e.preventDefault();

    if (
      e.dataTransfer.files &&
      e.dataTransfer.files.length > 0
    ) {

      handleFiles(
        Array.from(e.dataTransfer.files)
      );
    }
  };

  const handleFiles = async (
    files: File[]
  ) => {

    for (const file of files) {

      // ONLY PDF
      if (
        file.type !== "application/pdf"
      ) {

        setUploadedFiles(prev => [
          ...prev,
          {
            name: file.name,
            status: "Error",
            error:
              "Only PDF files are supported."
          }
        ]);

        continue;
      }

      // SHOW UPLOADING
      setUploadedFiles(prev => [
        ...prev,
        {
          name: file.name,
          status: "Uploading..."
        }
      ]);

      const formData = new FormData();

      formData.append("file", file);

      try {

        const response = await fetch(
          "http://localhost:8000/api/upload",
          {
            method: "POST",
            body: formData
          }
        );

        if (!response.ok) {
          throw new Error(
            "Upload failed."
          );
        }

        // =========================
        // SAVE CURRENT PAPER
        // =========================

        localStorage.setItem(
          "currentPaper",
          file.name
        );

        // =========================
        // UPDATE STATUS
        // =========================

        setUploadedFiles(prev =>
          prev.map(f =>
            f.name === file.name
              ? {
                  ...f,
                  status: "Processed"
                }
              : f
          )
        );

      } catch (err) {

        console.error(err);

        setUploadedFiles(prev =>
          prev.map(f =>
            f.name === file.name
              ? {
                  ...f,
                  status: "Error",
                  error:
                    "Failed to upload/process."
                }
              : f
          )
        );
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">

      {/* HEADER */}

      <motion.div
        initial={{
          opacity: 0,
          y: -20
        }}
        animate={{
          opacity: 1,
          y: 0
        }}
      >

        <h2 className="text-3xl font-bold tracking-tight">
          Upload Research Papers
        </h2>

        <p className="text-gray-400 mt-2">
          Drag and drop PDFs to extract
          insights and generate embeddings.
        </p>

      </motion.div>

      {/* UPLOAD BOX */}

      <motion.div
        initial={{
          opacity: 0,
          scale: 0.98
        }}
        animate={{
          opacity: 1,
          scale: 1
        }}
        transition={{
          delay: 0.1
        }}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className="
          glass-panel
          border-2
          border-dashed
          border-primary/40
          rounded-2xl
          p-16
          flex
          flex-col
          items-center
          justify-center
          text-center
          cursor-pointer
          hover:bg-primary/5
          transition
          group
        "
      >

        <div
          className="
            p-4
            rounded-full
            bg-primary/10
            text-primary
            mb-4
            group-hover:scale-110
            transition-transform
          "
        >

          <UploadCloud
            className="w-10 h-10"
          />

        </div>

        <h3 className="text-xl font-bold text-white mb-2">
          Click or drag files here
        </h3>

        <p className="text-gray-400 mb-6">
          Support for multiple PDFs
          (Max 50MB each)
        </p>

        <label
          className="
            px-6
            py-3
            rounded-lg
            bg-primary
            text-white
            font-medium
            cursor-pointer
            hover:bg-primary/90
            transition
            shadow-lg
            shadow-primary/25
          "
        >

          Browse Files

          <input
            type="file"
            multiple
            accept=".pdf"
            className="hidden"
            onChange={(e) =>
              e.target.files &&
              handleFiles(
                Array.from(e.target.files)
              )
            }
          />

        </label>

      </motion.div>

      {/* HISTORY */}

      {uploadedFiles.length > 0 && (

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-4"
        >

          <h3 className="text-lg font-semibold">
            Upload History
          </h3>

          <div className="space-y-3">

            {uploadedFiles.map(
              (file, i) => (

              <div
                key={i}
                className={`
                  glass-panel
                  p-4
                  rounded-lg
                  flex
                  items-center
                  justify-between
                  border-l-4
                  ${
                    file.status === "Error"
                      ? "border-l-destructive"
                      : "border-l-primary"
                  }
                `}
              >

                <div className="flex items-center gap-3">

                  <File
                    className="
                      w-5
                      h-5
                      text-gray-400
                    "
                  />

                  <span className="font-medium">
                    {file.name}
                  </span>

                </div>

                {file.status ===
                "Processed" ? (

                  <span
                    className="
                      flex
                      items-center
                      text-green-400
                      text-sm
                      font-medium
                    "
                  >

                    <CheckCircle
                      className="
                        w-4
                        h-4
                        mr-1
                      "
                    />

                    Processed

                  </span>

                ) : file.status ===
                  "Error" ? (

                  <span
                    className="
                      flex
                      items-center
                      text-destructive
                      text-sm
                      font-medium
                    "
                  >

                    <AlertCircle
                      className="
                        w-4
                        h-4
                        mr-1
                      "
                    />

                    {file.error}

                  </span>

                ) : (

                  <span
                    className="
                      flex
                      items-center
                      text-primary
                      text-sm
                      font-medium
                      animate-pulse
                    "
                  >

                    <Loader2
                      className="
                        w-4
                        h-4
                        mr-1
                        animate-spin
                      "
                    />

                    {file.status}

                  </span>
                )}

              </div>
            ))}

          </div>

        </motion.div>
      )}

    </div>
  );
}