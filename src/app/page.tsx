"use client";
import Header from "@/components/Header/page";
import { useEffect, useRef, useState } from "react";
import Scene from "./test/page";
import Footer from "@/components/Footer/page";

const IndexPage: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;

    const hacking = () => {
      if (!canvas) return;

      const contexto = canvas.getContext("2d");
      if (!contexto) return;

      const letraTam = 12;
      const columnas = canvas.width / letraTam;
      let Texto = "2".split("");
      let Texto2 = "3".split("");

      const letras: number[] = [];
      for (let i = 0; i < columnas; i++) {
        letras[i] = 1;
      }

      const dibujar = () => {
        if (!contexto) return;

        contexto.fillStyle = "rgba(0,0,0,0.05)";
        contexto.fillRect(0, 0, canvas.width, canvas.height);

        contexto.fillStyle = "#0f0"; // Green text
        contexto.font = `${letraTam}px arial`;

        for (let i = 0; i < letras.length; i++) {
          const text = i % 2 === 0 ? Texto : Texto2;

          contexto.fillText(text.join(""), i * letraTam, letras[i] * letraTam);

          if (letras[i] * letraTam > canvas.height && Math.random() > 0.975) {
            letras[i] = 0;
          }
          letras[i]++;
        }
      };

      const intervalId = setInterval(dibujar, 120);

      return () => {
        clearInterval(intervalId);
      };
    };

    const updateCanvasSize = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        hacking(); // Now it's safe to call hacking since it's defined above
      }
    };

    window.addEventListener("resize", updateCanvasSize);
    updateCanvasSize(); // Initial size update
    const timer = setTimeout(() => {
      setOpacity(1); // Gradually make the Scene visible
    }, 4000); // 10 seconds

    return () => {
      clearTimeout(timer); // Clear the timer on component unmount
      window.removeEventListener("resize", updateCanvasSize);
    };
  }, []);

  return (
    <>
      <Header />

      <div className="h-screen bg-black w-full relative">
        <canvas
          ref={canvasRef}
          className="w-full h-full absolute top-0 left-0"
        ></canvas>

        <div
          className="animate-bounce pt-[800px]"
          style={{ animationDuration: "20s" }}
        >
          {" "}
          {/* Adjust the animation duration here */}
          <div
            className="absolute top-1/2 right-1/4 z-50 animate-bounce"
            style={{
              animationDuration: "20s",
              opacity: opacity,
              transition: "opacity 4s ease-in-out",
            }} // Apply transition to change opacity
          >
            <Scene />
          </div>
          <Footer />
        </div>
      </div>

      <div className="bg-white"></div>
    </>
  );
};

export default IndexPage;
