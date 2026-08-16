"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import type { ChangeEvent, DragEvent } from "react";
import {
  UploadCloud,
  FileText,
  Image as ImageIcon,
  X,
  CheckCircle2,
  RefreshCw,
  AlertCircle,
} from "lucide-react";

interface FileUploadProps {
  name: string;
  type: "coverImage" | "pdf";
  defaultValue?: string;
  onChange?: (url: string) => void;
  label?: string;
}

function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 B";
  const units = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(i > 0 ? 1 : 0)} ${units[i]}`;
}

export default function FileUpload({
  name,
  type,
  defaultValue = "",
  onChange,
  label,
}: FileUploadProps) {
  const [fileUrl, setFileUrl] = useState<string>(defaultValue);
  const [fileName, setFileName] = useState<string>("");
  const [fileSize, setFileSize] = useState<number>(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string>("");

  const fileInputRef = useRef<HTMLInputElement>(null);
  const dragCounterRef = useRef(0);

  const accept =
    type === "pdf"
      ? ".pdf,application/pdf"
      : ".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp";

  const displayLabel = label || (type === "pdf" ? "Book PDF" : "Cover Image");
  const maxSize = type === "pdf" ? 50 * 1024 * 1024 : 5 * 1024 * 1024;
  const maxSizeLabel = type === "pdf" ? "50MB" : "5MB";

  // Sync defaultValue changes (e.g. when editing a book)
  useEffect(() => {
    if (defaultValue) {
      setFileUrl(defaultValue);
      if (type === "coverImage") {
        setImagePreviewUrl(defaultValue);
      }
      // Extract filename from URL
      const urlFileName = defaultValue.split("/").pop() || "";
      setFileName(urlFileName);
    }
  }, [defaultValue, type]);

  const validateFile = useCallback(
    (file: File): string | null => {
      // Size check
      if (file.size > maxSize) {
        return `File is too large. Maximum size is ${maxSizeLabel}.`;
      }

      // Type check
      if (type === "coverImage") {
        const validTypes = ["image/jpeg", "image/png", "image/webp"];
        if (!validTypes.includes(file.type)) {
          return "Invalid format. Only JPG, PNG, and WEBP images are accepted.";
        }
      } else {
        if (file.type !== "application/pdf") {
          return "Invalid format. Only PDF files are accepted.";
        }
      }

      return null;
    },
    [maxSize, maxSizeLabel, type]
  );

  const handleUpload = useCallback(
    async (file: File) => {
      // Client-side validation
      const validationError = validateFile(file);
      if (validationError) {
        setError(validationError);
        return;
      }

      setError(null);
      setIsUploading(true);
      setProgress(0);
      setFileName(file.name);
      setFileSize(file.size);

      // Create local preview for images immediately
      if (type === "coverImage") {
        const reader = new FileReader();
        reader.onload = (e) => {
          setImagePreviewUrl(e.target?.result as string);
        };
        reader.readAsDataURL(file);
      }

      const formData = new FormData();
      formData.append("file", file);
      formData.append("type", type);

      try {
        // Simulate granular progress
        let currentProgress = 0;
        const progressInterval = setInterval(() => {
          currentProgress = Math.min(currentProgress + Math.random() * 15, 90);
          setProgress(Math.round(currentProgress));
        }, 150);

        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        clearInterval(progressInterval);
        setProgress(100);

        const data = await res.json();

        if (!res.ok || !data.success) {
          throw new Error(data.message || "Upload failed");
        }

        // Small delay to show 100% before completing
        await new Promise((r) => setTimeout(r, 300));

        setFileUrl(data.url);
        if (type === "coverImage") {
          setImagePreviewUrl(data.url);
        }
        if (onChange) {
          onChange(data.url);
        }
      } catch (err: unknown) {
        const message =
          err instanceof Error ? err.message : "Failed to upload file";
        setError(message);
        setProgress(0);
        setImagePreviewUrl("");
      } finally {
        setIsUploading(false);
      }
    },
    [onChange, type, validateFile]
  );

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleUpload(file);
    }
    // Reset input value so re-selecting the same file triggers onChange
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounterRef.current += 1;
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setIsDragging(true);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounterRef.current -= 1;
    if (dragCounterRef.current === 0) {
      setIsDragging(false);
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    dragCounterRef.current = 0;

    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleUpload(file);
    }
  };

  const removeFile = () => {
    setFileUrl("");
    setFileName("");
    setFileSize(0);
    setImagePreviewUrl("");
    setError(null);
    setProgress(0);
    if (onChange) {
      onChange("");
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const replaceFile = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full">
      <label className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-[var(--color-text-primary)]">
        {type === "coverImage" ? (
          <ImageIcon size={16} className="text-[var(--color-accent-peach)]" />
        ) : (
          <FileText size={16} className="text-[var(--color-accent-peach)]" />
        )}
        {displayLabel}
      </label>

      {/* Hidden file input */}
      <input
        type="file"
        accept={accept}
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileChange}
      />

      {/* Hidden input for form submission */}
      <input type="hidden" name={name} value={fileUrl} />

      {/* ─── EMPTY STATE: Drop zone ─── */}
      {!fileUrl && !isUploading && (
        <div
          onDragEnter={handleDragEnter}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`
            relative flex cursor-pointer flex-col items-center justify-center
            rounded-2xl border-2 border-dashed p-10 transition-all duration-300
            ${
              isDragging
                ? "border-[#D9895B] bg-[#FFF7F1] dark:bg-[#2b3330] shadow-lg shadow-[#D9895B]/10"
                : "border-[var(--color-border-soft)] dark:border-[#2a332d] bg-[#FFFDFB] dark:bg-[#242b28] hover:border-[#D9895B]/60 hover:bg-[#FFF7F1] dark:hover:bg-[#2b3330]/50/50 dark:hover:bg-[#2b3330]/50 hover:shadow-md"
            }
          `}
          style={{ minHeight: type === "coverImage" ? "220px" : "180px" }}
        >
          <div
            className={`
              mb-4 rounded-2xl p-4 transition-all duration-300
              ${
                isDragging
                  ? "scale-110 bg-[var(--color-accent-peach)] text-white"
                  : "bg-[#F7F1EC] dark:bg-[#1a2421] text-[var(--color-accent-peach)]"
              }
            `}
          >
            <UploadCloud size={32} />
          </div>

          <p className="mb-1 text-center font-medium text-[var(--color-text-primary)]">
            {isDragging ? (
              <span className="text-[var(--color-accent-peach)]">Drop your file here</span>
            ) : (
              <>
                Drag & drop your{" "}
                {type === "coverImage" ? "image" : "PDF"} here
              </>
            )}
          </p>

          <p className="mb-4 text-sm text-gray-400">or</p>

          <span
            className={`
              inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium transition-all duration-200
              ${
                isDragging
                  ? "bg-[var(--color-accent-peach)] text-white"
                  : "bg-[#F7F1EC] dark:bg-[#1a2421] text-[var(--color-accent-peach)] hover:bg-[var(--color-accent-peach)] hover:text-white"
              }
            `}
          >
            <UploadCloud size={16} />
            {type === "coverImage"
              ? "Upload Cover Image"
              : "Upload PDF"}
          </span>

          <p className="mt-4 text-xs text-gray-400">
            {type === "pdf"
              ? "PDF only · Max 50MB"
              : "JPG, PNG, WEBP · Max 5MB"}
          </p>
        </div>
      )}

      {/* ─── UPLOADING STATE ─── */}
      {isUploading && (
        <div className="overflow-hidden rounded-2xl border border-[var(--color-border-soft)] dark:border-[#2a332d] bg-[#FFFDFB] dark:bg-[#242b28]">
          {/* Image preview during upload */}
          {type === "coverImage" && imagePreviewUrl && (
            <div className="flex items-center justify-center bg-[var(--color-surface-secondary)] p-6">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imagePreviewUrl}
                alt="Uploading preview"
                className="h-40 w-auto rounded-lg object-contain opacity-60"
              />
            </div>
          )}

          <div className="p-6">
            <div className="mb-3 flex items-center gap-3">
              <div className="flex h-10 w-10 animate-pulse items-center justify-center rounded-xl bg-[#F7F1EC] dark:bg-[#1a2421] text-[var(--color-accent-peach)]">
                <UploadCloud size={20} />
              </div>
              <div className="flex-1">
                <p className="font-medium text-[var(--color-text-primary)]">
                  Uploading{fileName ? ` ${fileName}` : "..."}
                </p>
                {fileSize > 0 && (
                  <p className="text-xs text-gray-400">
                    {formatFileSize(fileSize)}
                  </p>
                )}
              </div>
              <span className="text-sm font-medium text-[var(--color-accent-peach)]">
                {progress}%
              </span>
            </div>

            {/* Progress bar */}
            <div className="h-2 w-full overflow-hidden rounded-full bg-[#F7F1EC] dark:bg-[#1a2421]">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#D9895B] to-[#E8A87C] transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {/* ─── UPLOADED STATE: Cover Image ─── */}
      {fileUrl && !isUploading && type === "coverImage" && (
        <div className="overflow-hidden rounded-2xl border border-[var(--color-border-soft)] dark:border-[#2a332d] bg-[#FFFDFB] dark:bg-[#242b28] transition-all duration-300 hover:shadow-md">
          {/* Image preview */}
          <div className="relative bg-[var(--color-surface-secondary)] p-6">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imagePreviewUrl || fileUrl}
              alt="Cover preview"
              className="mx-auto h-52 w-auto rounded-lg object-contain"
            />

            {/* Overlay buttons */}
            <div className="absolute inset-0 flex items-center justify-center gap-3 bg-black/0 opacity-0 transition-all duration-300 hover:bg-black/30 hover:opacity-100">
              <button
                type="button"
                onClick={replaceFile}
                className="flex items-center gap-2 rounded-xl bg-[var(--color-surface-elevated)] dark:bg-[#242b28] px-4 py-2.5 text-sm font-medium text-[var(--color-text-primary)] shadow-lg transition-transform hover:scale-105"
              >
                <RefreshCw size={14} />
                Replace
              </button>
              <button
                type="button"
                onClick={removeFile}
                className="flex items-center gap-2 rounded-xl bg-red-500 px-4 py-2.5 text-sm font-medium text-white shadow-lg transition-transform hover:scale-105"
              >
                <X size={14} />
                Remove
              </button>
            </div>
          </div>

          {/* File info */}
          <div className="flex items-center gap-3 border-t border-[#F0E8DF] px-5 py-3.5">
            <CheckCircle2 size={16} className="flex-shrink-0 text-green-500" />
            <p className="flex-1 truncate text-sm text-[var(--color-text-primary)]">
              {fileName || fileUrl.split("/").pop()}
            </p>
            {fileSize > 0 && (
              <span className="text-xs text-gray-400">
                {formatFileSize(fileSize)}
              </span>
            )}
          </div>
        </div>
      )}

      {/* ─── UPLOADED STATE: PDF ─── */}
      {fileUrl && !isUploading && type === "pdf" && (
        <div className="overflow-hidden rounded-2xl border border-[var(--color-border-soft)] dark:border-[#2a332d] bg-[#FFFDFB] dark:bg-[#242b28] transition-all duration-300 hover:shadow-md">
          <div className="flex items-center gap-4 p-5">
            {/* PDF icon */}
            <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-[#F7F1EC] dark:bg-[#1a2421]">
              <FileText size={28} className="text-[var(--color-accent-peach)]" />
            </div>

            {/* File details */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <CheckCircle2
                  size={14}
                  className="flex-shrink-0 text-green-500"
                />
                <p className="text-sm font-medium text-green-600">
                  Upload complete
                </p>
              </div>
              <p
                className="mt-1 truncate font-medium text-[var(--color-text-primary)]"
                title={fileName || fileUrl}
              >
                {fileName || fileUrl.split("/").pop()}
              </p>
              {fileSize > 0 && (
                <p className="mt-0.5 text-sm text-gray-400">
                  {formatFileSize(fileSize)}
                </p>
              )}
            </div>

            {/* Action buttons */}
            <div className="flex flex-shrink-0 items-center gap-2">
              <button
                type="button"
                onClick={replaceFile}
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#F7F1EC] dark:bg-[#1a2421] text-[var(--color-accent-peach)] transition-all hover:bg-[var(--color-accent-peach)] hover:text-white"
                title="Replace PDF"
              >
                <RefreshCw size={16} />
              </button>
              <button
                type="button"
                onClick={removeFile}
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#F7F1EC] dark:bg-[#1a2421] text-gray-500 transition-all hover:bg-red-100 hover:text-red-500"
                title="Remove PDF"
              >
                <X size={16} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── ERROR STATE ─── */}
      {error && (
        <div className="mt-3 flex items-start gap-2 rounded-xl bg-red-50 px-4 py-3">
          <AlertCircle
            size={16}
            className="mt-0.5 flex-shrink-0 text-red-500"
          />
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}
    </div>
  );
}
