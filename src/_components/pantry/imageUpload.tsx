"use client";

import { useState, useCallback } from "react";
import { generateReactHelpers } from "@uploadthing/react/hooks";
import type { fileRouter as OurFileRouter } from "@/app/api/uploadthing/core";
import {
  FileUploader,
  FileUploaderContent,
  FileUploaderItem,
  FileInput,
} from "@/components/ui/image-dropzone";
import { Paperclip } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import { ClientUploadedFileData } from "uploadthing/types";
import { DropzoneOptions } from "react-dropzone";

const { useUploadThing } = generateReactHelpers<OurFileRouter>();

const FileSvgDraw = () => {
  return (
    <>
      <svg
        className="mb-3 h-8 w-8 text-muted-foreground"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 20 16"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
        />
      </svg>
      <p className="mb-1 text-sm text-accent-foreground">
        <span className="font-semibold">Click to upload</span>
        &nbsp; or drag and drop
      </p>
      <p className="text-xs text-accent-foreground">SVG, PNG, JPG or GIF</p>
    </>
  );
};

interface ImageUploaderProps {
  onUploadComplete: (
    res: ClientUploadedFileData<{ uploadedBy: number }>,
  ) => void;
}

const ImageUploader = ({ onUploadComplete }: ImageUploaderProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const { toast } = useToast();

  const { startUpload, permittedFileInfo } = useUploadThing("imageUploader", {
    onClientUploadComplete: (res) => {
      if (res) {
        setUploadedFiles((prev) => [...prev, ...res.map((file) => file.url)]);
        console.log("Files uploaded successfully!");
        toast({
          title: "Image Uploaded",
          description: "Your image  been uploaded successfully",
        });
        setUploadProgress(0);
        onUploadComplete(res[0]!);
      }
    },
    onUploadError: (error) => {
      console.error("Error uploading file:", error);
    },
    onUploadProgress: (progress) => {
      setUploadProgress(progress);
    },
  });

  const handleFilesChange = useCallback(
    (newFiles: File[] | null) => {
      if (newFiles) {
        setFiles(newFiles);
        startUpload(newFiles);
      }
    },
    [startUpload],
  );

  const dropZoneConfig: DropzoneOptions = {
    maxFiles: 1,
    maxSize: 1024 * 1024 * 4,
    multiple: false,
  };

  return (
    <FileUploader
      value={files}
      onValueChange={handleFilesChange}
      dropzoneOptions={dropZoneConfig}
      className="relative rounded-lg bg-background p-2"
    >
      <FileInput className="text-accent outline-dashed outline-1 outline-primary-foreground">
        <div className="flex w-full flex-col items-center justify-center pb-4 pt-3">
          <FileSvgDraw />
        </div>
      </FileInput>
      <FileUploaderContent>
        {files.map((file, i) => (
          <div key={i} className="mb-2">
            <FileUploaderItem index={i}>
              <Paperclip className="h-4 w-4 stroke-current" />
              <span>{file.name}</span>
            </FileUploaderItem>
            <Progress value={uploadProgress} className="mt-1 h-1 w-full" />
          </div>
        ))}
      </FileUploaderContent>
    </FileUploader>
  );
};

export default ImageUploader;
