import html2canvas from "html2canvas";

export async function capturePostImages(): Promise<File[]> {
  const printSections = document.querySelectorAll(".printSection");
  const images: File[] = [];

  for (let i = 0; i < printSections.length; i++) {
    const section = printSections[i] as HTMLElement;

    try {
      // Capture the section as canvas
      const canvas = await html2canvas(section, {
        width: 7 * 96, // 7 inches * 96 DPI
        height: 7 * 96, // 7 inches * 96 DPI
        scale: 2, // Higher resolution
        useCORS: true,
        allowTaint: true,
        backgroundColor: null,
        logging: false,
      });

      // Convert canvas to blob
      const blob = await new Promise<Blob>((resolve) => {
        canvas.toBlob(
          (blob) => {
            resolve(blob!);
          },
          "image/png",
          1.0
        );
      });

      // Create file from blob
      const file = new File([blob], `post-page-${i + 1}.png`, {
        type: "image/png",
      });

      images.push(file);
    } catch (error) {
      console.error(`Failed to capture section ${i + 1}:`, error);
    }
  }

  return images;
}
