// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Header from "./sections/Header.jsx";
// import Hero from "./sections/Hero.jsx";
// import Features from "./sections/Features.jsx";
// import Pricing from "./sections/Pricing.jsx";
// import Faq from "./sections/Faq.jsx";
// import Testimonials from "./sections/Testimonials.jsx";
// import Download from "./sections/Download.jsx";
// import Footer from "./sections/Footer.jsx";
// import Chat from "./pages/Chat.jsx";

// const App = () => {
//   return (
//     <BrowserRouter>
//       <main className="overflow-hidden">
//         <Header />
//         <Routes>
//           <Route
//             path="/"
//             element={
//               <>
//                 <Hero />
//                 <Features />
//                 <Pricing />
//                 <Faq />
//                 <Testimonials />
//                 <Download />
//               </>
//             }
//           />
//           <Route path="/chat" element={<Chat />} />
//         </Routes>
//         <Footer />
//       </main>
//     </BrowserRouter>
//   );
// };

// export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./sections/Header.jsx";
import Hero from "./sections/Hero.jsx";
import Features from "./sections/Features.jsx";
import Pricing from "./sections/Pricing.jsx";
import Faq from "./sections/Faq.jsx";
import Testimonials from "./sections/Testimonials.jsx";
import Download from "./sections/Download.jsx";
import Footer from "./sections/Footer.jsx";
import Chat from "./pages/Chat.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <main className="overflow-hidden">
        <Routes>
          {/* ===== Landing Page ===== */}
          <Route
            path="/"
            element={
              <>
                <Header />
                <Hero />
                <Features />
                <Pricing />
                <Faq />
                <Testimonials />
                <Download />
                <Footer />
              </>
            }
          />

          {/* ===== Handwriting Page ===== */}
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;
