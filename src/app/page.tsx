"use client";
import { useEffect, useRef } from "react";

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
    <div className="h-screen bg-black w-full">
      <canvas ref={canvasRef} className="w-full h-full"></canvas>
    </div>
  );
};

export default IndexPage;
