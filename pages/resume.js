import Button from "../components/Button/Button";

export default function Component() {
  // Assuming your resume PDF is located in the public folder as resume.pdf
  const resumeUrl = "/resume.pdf";

  const handleDownload = () => {
    // Create a temporary link element
    const link = document.createElement("a");
    link.href = resumeUrl;
    link.download = "resume.pdf"; // File name for the download
    link.click();
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#000] p-8 md:p-3 lg:p-3 cursor-pointer">
      <div className="flex flex-col items-end cursor-pointer">
        <Button
          onClick={handleDownload}
          classes="link"
          type="primary"
        >
          Download Resume
        </Button>
      </div>

      <div className="mt-4 flex flex-1 flex-col rounded-lg border-4 border-[#6b49c8] bg-white p-3 md:p-5 lg:p-5">
        <div className="flex flex-col items-center">
          <img
            src="/placeholder.svg"
            alt="Profile Picture"
            width={120}
            height={120}
            className="rounded-full"
            style={{ aspectRatio: "120/120", objectFit: "cover" }}
          />
        </div>

        {/* Display the PDF */}
        <div className="mt-8 w-full cursor-pointer">
          <iframe
            src={resumeUrl}
            width="100%"
            height="1800px"
            className="border-4 border-[#6b49c8] rounded-lg"
          />
        </div>
      </div>
    </div>
  );
}
