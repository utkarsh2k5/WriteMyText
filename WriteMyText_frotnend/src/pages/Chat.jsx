import { useState } from "react";
import { createPortal } from "react-dom";
import { Sun, Moon } from "lucide-react";
import Button from "../components/Button.jsx";

export default function Chat() {
  const [text, setText] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [theme, setTheme] = useState("dark");
  const toggle = () => setTheme((t) => (t === "light" ? "dark" : "light"));

  const handleGenerate = async () => {
    if (!text.trim()) return;
    setIsLoading(true);
    try {
      const fd = new FormData();
      fd.append("text", text);
      const res = await fetch("http://127.0.0.1:8000/generate-note/", { method: "POST", body: fd });
      if (!res.ok) throw new Error("Failed to generate");
      const blob = await res.blob();
      setImageUrl(URL.createObjectURL(blob));
    } catch (e) {
      alert(e.message || e);
    } finally {
      setIsLoading(false);
    }
  };

  const bg = theme === "light" ? "bg-gradient-to-br from-[#f8fafc] via-[#e0f2fe] to-[#f1f5f9] text-gray-900" : "bg-gradient-to-br from-[#0b1020] via-[#131334] to-[#0b1020] text-white";
  const box = theme === "light" ? "bg-white border border-gray-200" : "bg-s1 border-2 border-s3";

  return (
    <main className={`w-screen min-h-screen ${bg} transition-all duration-700 overflow-hidden`}>
      <button onClick={toggle} aria-label="Toggle theme" className="fixed top-6 right-6 z-50 size-10 rounded-full border-2 border-s4/25 bg-s1/50 flex items-center justify-center shadow-500">
        {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
      </button>

      {createPortal(
        <div style={{ position: "fixed", top: 24, left: "50%", transform: "translateX(-50%)", zIndex: 9999 }} className="text-center pointer-events-auto max-w-[920px] px-4">
          <div className={`caption small-2 uppercase ${theme === "light" ? "text-gray-900" : "text-white"}`}>Handwriting Generator</div>
          <h1 className={`mb-1 h2 md:h2 ${theme === "light" ? "text-gray-900" : "text-p4"}`}>Convert text into realistic handwritten note</h1>
        </div>,
        document.body,
      )}

      <section className="pt-32 pb-24">
        <div className="container">
          <div className="mx-auto max-w-[1100px] text-center pt-44">
            <div className={`mx-auto w-full md:w-[85%] rounded-3xl p-6 md:p-8 shadow-500 ${box}`}>
              <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Write something personal..." aria-label="Handwriting input"
                className={`w-full h-44 p-5 rounded-2xl resize-none mb-6 body-1 ${theme === "light" ? "bg-white text-gray-900 border border-gray-200 placeholder-gray-400" : "bg-s1 text-p5 border border-s3 placeholder:text-p5/60"}`} />

              <div className="flex items-center justify-center gap-4">
                <Button icon="/images/zap.svg" iconAlt="zap" onClick={handleGenerate} disabled={isLoading} containerClassName="min-w-[220px]">{isLoading ? "Generating..." : "Generate Note"}</Button>
                {imageUrl && <a href={imageUrl} download="handwritten_note.jpg" className={`base-bold uppercase transition-colors ${theme === "light" ? "text-gray-800 hover:text-gray-900" : "text-p4 hover:text-p1"}`}>Download</a>}
              </div>

              {imageUrl && (<div className={`mt-8 rounded-xl p-4 ${theme === "light" ? "bg-white border border-gray-200" : "bg-s1 border border-s3"}`}><img src={imageUrl} alt="Generated handwritten note" className="rounded-lg max-w-full h-auto mx-auto"/></div>)}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

