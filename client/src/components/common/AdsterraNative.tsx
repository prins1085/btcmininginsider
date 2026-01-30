// "use client";
// import { useEffect } from "react";

// export default function AdsterraNative() {
//   useEffect(() => {
//     const script = document.createElement("script");
//     script.src = "https://pl28605389.effectivegatecpm.com/43e07c1477fb7d10b52d14e79c61895f/invoke.js"; // your script URL
//     script.async = true;
//     script.setAttribute("data-cfasync", "false");

//     document.body.appendChild(script);
//   }, []);

//   return <div id="container-43e07c1477fb7d10b52d14e79c61895f"></div>; // your container id
// }


"use client";
import { useEffect } from "react";

export default function AdsterraNative() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "//plXXXX.highrevenuegate.com/XXXX/invoke.js";
    script.async = true;
    script.setAttribute("data-cfasync", "false");
    document.body.appendChild(script);
  }, []);

  return <div id="container-43e07c1477fb7d10b52d14e79c61895f"></div>;
}
