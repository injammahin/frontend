"use client";
import Header from "@/components/Header/page";
import { useEffect, useRef } from "react";
import Scene from "./test/page";

const IndexPage: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    const hacking = () => {
      if (!canvas) return;

      const contexto = canvas.getContext("2d");
      if (!contexto) return;

      const letraTam = 12;
      const columnas = canvas.width / letraTam;
      let Texto = "0".split("");
      let Texto2 = "1".split("");

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

    return () => {
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
          <div className="absolute top-1/2 right-1/4 z-50">
            <Scene />
          </div>
        </div>
      </div>
    </>
  );
};

export default IndexPage;
