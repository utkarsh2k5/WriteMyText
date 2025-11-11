import { Element } from "react-scroll";
import { useState, useEffect } from "react";
import clsx from "clsx";
import Button from "../components/Button.jsx";
import { useNavigate } from "react-router-dom";

const Pricing = () => {
  const navigate = useNavigate();
  return (
    <section>
      <Element name="pricing">
        <div className="container">
          <div className="max-w-960 pricing-head_before relative mx-auto border-l border-r border-s2 bg-s1/50 pb-40 pt-28 max-xl:max-w-4xl max-lg:border-none max-md:pb-32 max-md:pt-16">
            <h3 className="h3 max-lg:h4 max-md:h5 z-3 relative mx-auto mb-14 max-w-lg text-center text-p4 max-md:mb-11 max-sm:max-w-sm">
              Upload Your Handwriting
            </h3>

            

            <div className="pricing-bg">
              <img
                src="/images/bg-outlines.svg"
                width={960}
                height={380}
                alt="outline"
                className="relative z-2"
              />
              <img
                src="/images/bg-outlines-fill.png"
                width={960}
                height={380}
                alt="outline"
                className="absolute inset-0 opacity-5 mix-blend-soft-light"
              />
            </div>
          </div>

          {/*  simplified get-started box (replaces pricing cards) */}
          <div className="scroll-hide relative z-2 -mt-12 flex items-start justify-center">
            <div className="pricing-plan_first pricing-plan_last relative border-2 p-7 w-full rounded-3xl max-w-[1200px]">
              <div className="relative flex flex-col gap-6 pt-6">
                <div className="small-2 rounded-20 relative z-2 mx-auto mb-0 border-2 px-4 py-1.5 uppercase border-p1 text-p1">
                  Ready to get started?
                </div>

                <div className="flex items-start gap-6 max-md:flex-col">
                  {/* Left: Fonts list */}
                  <div className="w-2/5 max-md:w-full">
                    <h5 className="small-1 mb-4 text-p4">Fonts</h5>
                    <FontsList />
                  </div>

                  {/* spacer / middle column (kept empty on wide screens) */}
                  <div className="flex w-1/5 items-center justify-center" />

                  {/* Right: Preview / page area */}
                  <div className="w-2/5 max-md:w-full">
                    <h5 className="small-1 mb-4 text-p4">Preview</h5>
                    <PreviewArea />
                  </div>
                </div>

                {/* Bottom: Centered Get Started button */}
                <div className="mt-6 flex w-full justify-center">
                  <div className="w-full max-w-[420px]">
                    <Button
                      containerClassName="w-full"
                      innerClassName="min-h-[72px] px-8 bg-red-600 text-white"
                      onClick={() => navigate('/chat')}
                    >
                      Get Started
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Element>
    </section>
  );
};

export default Pricing;

// --- Small local components for font selection and preview ---
const sampleFonts = [
  { id: "hand1", name: "Dancing Script, cursive", label: "Script (casual)" },
  { id: "hand2", name: "Pacifico, cursive", label: "Signature" },
  { id: "hand3", name: "'Comic Sans MS', 'Comic Sans', cursive", label: "Playful" },
];

function FontsList() {
  const [selected, setSelected] = useState(sampleFonts[0].id);

  return (
    <div className="space-y-3">
      {sampleFonts.map((f) => (
        <button
          key={f.id}
          onClick={() => {
            const evt = new CustomEvent("font-change", { detail: f.name });
            window.dispatchEvent(evt);
            setSelected(f.id);
          }}
          className={clsx(
            "w-full text-left rounded-12 border px-4 py-3",
            selected === f.id ? "border-p3 text-p3" : "border-s2 text-p4"
          )}
        >
          <div className="small-2">{f.label}</div>
          <div className="body-1 mt-1" style={{ fontFamily: f.name }}>
            The quick brown fox jumps over the lazy dog
          </div>
        </button>
      ))}
    </div>
  );
}

function PreviewArea() {
  const [text, setText] = useState("xomputerised");
  const [font, setFont] = useState(sampleFonts[0].name);

  useEffect(() => {
    const handler = (e) => setFont(e.detail);
    window.addEventListener("font-change", handler);
    return () => window.removeEventListener("font-change", handler);
  }, []);

  return (
    <div>
      <textarea
        id="hand-preview-textarea"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full min-h-[120px] rounded-12 border p-4 text-p4"
        style={{ fontFamily: "system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial", color: "#000" }}
      />

      <div className="mt-4 rounded-12 border p-6 bg-s1/30">
        <div className="small-2 mb-2">Page preview</div>
        <div className="body-1 p-4" style={{ fontFamily: font, whiteSpace: "pre-wrap", color: "#000" }}>
          {text}
        </div>
      </div>
    </div>
  );
}
