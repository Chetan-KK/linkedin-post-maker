import html2canvas from "html2canvas";

// Helper function to compress image
async function compressImage(
  file: File,
  maxSizeKB: number = 500
): Promise<File> {
  return new Promise((resolve) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d")!;
    const img = new Image();

    img.onload = () => {
      // Calculate compression ratio to stay under maxSizeKB
      const maxWidth = 1200; // Increased for better quality
      const maxHeight = 1200; // Increased for better quality

      let { width, height } = img;

      // Only resize if much larger than needed
      if (width > maxWidth || height > maxHeight) {
        const ratio = Math.min(maxWidth / width, maxHeight / height);
        width *= ratio;
        height *= ratio;
      }

      canvas.width = width;
      canvas.height = height;

      // Use better image rendering
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";

      // Draw and compress
      ctx.drawImage(img, 0, 0, width, height);

      // Start with higher quality and reduce if needed
      let quality = 0.9;

      const tryCompress = () => {
        canvas.toBlob(
          (blob) => {
            if (blob && blob.size <= maxSizeKB * 1024) {
              const compressedFile = new File(
                [blob],
                file.name.replace(".png", ".jpg"),
                {
                  type: "image/jpeg",
                }
              );
              resolve(compressedFile);
            } else if (quality > 0.4) {
              quality -= 0.1;
              tryCompress();
            } else {
              // If still too large, create a smaller file anyway
              canvas.toBlob(
                (blob) => {
                  const compressedFile = new File(
                    [blob!],
                    file.name.replace(".png", ".jpg"),
                    {
                      type: "image/jpeg",
                    }
                  );
                  resolve(compressedFile);
                },
                "image/jpeg",
                0.4
              );
            }
          },
          "image/jpeg",
          quality
        );
      };

      tryCompress();
    };

    img.src = URL.createObjectURL(file);
  });
}

export async function capturePostImages(
  onProgress?: (progress: number, stage: string) => void
): Promise<File[]> {
  const printSections = document.querySelectorAll(".printSection");
  const images: File[] = [];

  for (let i = 0; i < printSections.length; i++) {
    const section = printSections[i] as HTMLElement;
    const progressBase = (i / printSections.length) * 100;
    const progressStep = 100 / printSections.length;

    try {
      onProgress?.(
        progressBase + progressStep * 0.2,
        `Capturing image ${i + 1} of ${printSections.length}...`
      );

      // Get the actual dimensions of the section
      const rect = section.getBoundingClientRect();
      const actualWidth = Math.max(rect.width, section.scrollWidth);
      const actualHeight = Math.max(rect.height, section.scrollHeight);

      // Ensure minimum square dimensions for LinkedIn posts
      const minDimension = 600; // Minimum 600px for good quality
      const captureWidth = Math.max(actualWidth, minDimension);
      const captureHeight = Math.max(actualHeight, minDimension);

      // Use a reasonable scale for quality vs file size
      const scale = Math.min(2, 1200 / Math.max(captureWidth, captureHeight));

      onProgress?.(
        progressBase + progressStep * 0.4,
        `Rendering image ${i + 1}...`
      );

      // Capture the section as canvas with dynamic settings
      const canvas = await html2canvas(section, {
        width: captureWidth,
        height: captureHeight,
        scale: scale,
        useCORS: true,
        allowTaint: true,
        backgroundColor: null,
        logging: false,
        // Ensure we capture the full content
        scrollX: 0,
        scrollY: 0,
        // Allow for some extra space
        windowWidth: captureWidth,
        windowHeight: captureHeight,
      });

      onProgress?.(
        progressBase + progressStep * 0.6,
        `Converting image ${i + 1} to file...`
      );

      // Convert canvas to blob with good quality
      const blob = await new Promise<Blob>((resolve) => {
        canvas.toBlob(
          (blob) => {
            resolve(blob!);
          },
          "image/jpeg",
          0.9 // Higher quality to preserve text clarity
        );
      });

      // Create file from blob
      const tempFile = new File([blob], `post-page-${i + 1}.jpg`, {
        type: "image/jpeg",
      });

      onProgress?.(
        progressBase + progressStep * 0.8,
        `Compressing image ${i + 1}...`
      );

      // Compress the image further if needed
      const compressedFile = await compressImage(tempFile, 500); // Increased to 500KB for better quality
      images.push(compressedFile);

      onProgress?.(progressBase + progressStep, `Image ${i + 1} completed`);
    } catch (error) {
      console.error(`Failed to capture section ${i + 1}:`, error);
      onProgress?.(
        progressBase + progressStep,
        `Failed to capture image ${i + 1}`
      );
    }
  }

  return images;
}
