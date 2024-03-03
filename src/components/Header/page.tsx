import React, { useEffect } from "react";
import gsap from "gsap";
import Link from "next/link";
import Footer from "@/components/Footer/page";
const Header: React.FC = () => {
  useEffect(() => {
    const navElement = document.querySelector("nav");

    if (!navElement) return; // Ensure navElement exists

    const activeElement = document.createElement("div");
    activeElement.classList.add("active-element");
    navElement.appendChild(activeElement);

    const getOffsetLeft = (element: Element | null) => {
      if (!element) return 0; // Guard for null element
      const elementRect = element.getBoundingClientRect();
      return (
        elementRect.left -
        navElement.getBoundingClientRect().left +
        (elementRect.width - activeElement.offsetWidth) / 2
      );
    };

    const activeButton = navElement.querySelector("ul li.active button");
    if (activeButton) {
      gsap.set(activeElement, {
        x: getOffsetLeft(activeButton),
      });
    }

    document.fonts.ready.then(() => {
      gsap.to(activeElement, {
        "--active-element-show": "1",
        duration: 0.2,
      });
    });

    navElement.querySelectorAll("ul li button").forEach((button, index) => {
      button.addEventListener("mouseenter", () => {
        const active = navElement.querySelector("ul li.active");
        if (!active) return; // Guard for no active element
        const oldIndex = [...active.parentElement.children].indexOf(active);

        if (
          index === oldIndex ||
          navElement.classList.contains("before") ||
          navElement.classList.contains("after")
        ) {
          return;
        }

        const x = getOffsetLeft(button);
        const direction = index > oldIndex ? "after" : "before";
        const spacing = Math.abs(
          x - getOffsetLeft(active.querySelector("button"))
        );

        navElement.classList.add(direction);
        active.classList.remove("active");
        button.parentElement.classList.add("active");

        gsap.set(activeElement, {
          rotateY: direction === "before" ? "180deg" : "0deg",
        });

        gsap.to(activeElement, {
          keyframes: [
            {
              "--active-element-width": `${
                spacing > navElement.offsetWidth - 60
                  ? navElement.offsetWidth - 60
                  : spacing
              }px`,
              duration: 0.3,
              ease: "none",
              onStart: () => {
                createSVG(activeElement);

                gsap.to(activeElement, {
                  "--active-element-opacity": 1,
                  duration: 0.1,
                });
              },
            },
            {
              "--active-element-scale-x": "0",
              "--active-element-scale-y": ".25",
              "--active-element-width": "0px",
              duration: 0.3,
              onStart: () => {
                gsap.to(activeElement, {
                  "--active-element-mask-position": "40%",
                  duration: 0.5,
                });
                gsap.to(activeElement, {
                  "--active-element-opacity": 0,
                  delay: 0.1,
                  duration: 0.25,
                });
              },
              onComplete: () => {
                activeElement.innerHTML = "";
                navElement.classList.remove("before", "after");
                activeElement.removeAttribute("style");
                gsap.set(activeElement, {
                  x: getOffsetLeft(button),
                  "--active-element-show": "1",
                });
              },
            },
          ],
        });

        gsap.to(activeElement, {
          x,
          "--active-element-strike-x": "-50%",
          duration: 0.6,
          ease: "none",
        });
      });
    });

    const createSVG = (element: HTMLDivElement) => {
      element.innerHTML = `
        <svg viewBox="0 0 116 5" preserveAspectRatio="none" class="beam">
          <path d="M0.5 2.5L113 0.534929C114.099 0.515738 115 1.40113 115 2.5C115 3.59887 114.099 4.48426 113 4.46507L0.5 2.5Z" fill="url(#gradient-beam)"/>
          <defs>
            <linearGradient id="gradient-beam" x1="2" y1="2.5" x2="115" y2="2.5" gradientUnits="userSpaceOnUse">
              <stop stop-color="#6AAAFF"/>
              <stop offset="1" stop-color="white"/>
            </linearGradient>
          </defs>
        </svg>
        <div class="strike"></div>
      `;
    };
  }, []);

  return (
    <>
      <nav className="p-4 font-sen">
        <ul>
          <li className="active center">
            <button>Nav One</button>
          </li>
          <li>
            <button>One</button>
          </li>
          <li>
            <button>Two</button>
          </li>
          <li>
            <button>
              <Link href="/auth/register">link</Link>
            </button>
          </li>
          <li className="dropdown">
            <button>Four</button>
            <div className="dropdown-content  rounded-lg">
              <a href="#">Yes</a>
              <a href="#">Okay</a>
              <a href="#">No</a>
              <a href="#">Yes</a>
              <a href="#">Okay</a>
              <a href="#">No</a>
              <a href="#">Yes</a>
              <a href="#">Okay</a>
              <a href="#">No</a>
            </div>
          </li>
          <li>
            <button onClick={Footer}>footer</button>
          </li>
        </ul>
        <div className="active-element"></div>
      </nav>

      <style jsx>{`
        .dropdown {
          position: relative;
          display: inline-block;
        }

        .dropdown-content {
          display: none;
          position: absolute;
          background-color: #f9f9f9;
          min-width: 160px;
          box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
          z-index: 1;
        }

        .dropdown-content a {
          color: black;
          padding: 12px 16px;
          text-decoration: none;
          display: block;
        }

        .dropdown-content a:hover {
          background-color: #cccc;
        }

        .dropdown:hover .dropdown-content {
          display: block;
        }
      `}</style>
    </>
  );
};

export default Header;
