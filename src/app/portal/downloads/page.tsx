import { FileText, Download } from "lucide-react";

const downloads = [
  {
    title: "First Build It (PDF)",
    description: "The complete ebook formatted beautifully for tablets and computers.",
    filename: "FirstBuildEBook-18dbb855d0a07791.pdf",
    size: "9.2 MB"
  },
  {
    title: "The Workbook (PDF)",
    description: "Printable exercises, reflections, and the 30-day challenge grid.",
    filename: "sample.pdf",
    size: "1.4 MB"
  }
];

export default function DownloadsPage() {
  return (
    <div className="max-w-4xl animate-in fade-in duration-700">
      <div className="mb-10">
        <h1 className="font-serif text-3xl sm:text-4xl text-[#3A332D] mb-4">Your Downloads</h1>
        <p className="text-lg text-[#8A837D]">
          Download your files to read offline. We recommend the PDF for tablets and computers, and the Workbook for printing.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {downloads.map((item) => (
          <div key={item.title} className="flex flex-col justify-between rounded-2xl bg-white p-6 shadow-sm border border-black/[0.04]">
            <div className="mb-6">
              <div className="mb-4 inline-flex rounded-xl bg-[#FCF8F2] p-3 text-[#D9895B]">
                <FileText size={24} strokeWidth={1.5} />
              </div>
              <h3 className="mb-2 font-serif text-2xl text-[#3A332D]">{item.title}</h3>
              <p className="text-sm text-[#8A837D]">{item.description}</p>
            </div>
            
            <div className="flex items-center justify-between border-t border-black/[0.04] pt-4">
              <span className="text-xs font-medium uppercase tracking-widest text-[#8A837D]">
                {item.size}
              </span>
              <a
                href={`/uploads/${item.filename}`}
                download
                className="flex items-center gap-2 rounded-full bg-[#FCF8F2] px-4 py-2 text-sm font-medium text-[#D9895B] transition-colors hover:bg-[#D9895B] hover:text-white"
              >
                <Download size={16} />
                Download
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
