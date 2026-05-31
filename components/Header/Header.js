import { useCallback, useEffect, useRef } from "react";
import { Howl } from "howler";
import LogoMark from "./LogoMark";
import SoundBar from "./SoundBar/SoundBar";

const multiPop = new Howl({
  src: ["/sounds/multi-pop.mp3"],
});

const Header = ({ children }) => {
  const inputRef = useRef(null);

  const handleChange = useCallback((e) => {
    if (e.target.checked) multiPop.play();
  }, []);

  const handleKeyDown = useCallback((e) => {
    if (e.key === "Escape" && inputRef.current?.checked) {
      inputRef.current.checked = false;
      inputRef.current.dispatchEvent(new Event("change", { bubbles: true }));
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <nav className="w-full fixed top-0 py-8 z-50 select-none bg-gradient-to-b from-black shadow-black transition-all duration-300">
      <div className="flex justify-between section-container">
        <LogoMark href="/#home" />
        <div className="outer-menu relative flex items-center gap-8 z-[1]">
          {/* <SoundBar /> */}
          <input
            ref={inputRef}
            id="menu-toggle"
            aria-hidden="true"
            tabIndex={-1}
            className="checkbox-toggle"
            type="checkbox"
            onChange={handleChange}
          />
          <label
            htmlFor="menu-toggle"
            id="menu"
            aria-label="Open menu"
            className="hamburger link w-6 h-6 flex items-center justify-center touch-manipulation"
          >
            <div className="relative flex-none w-full bg-white duration-300 flex items-center justify-center" />
          </label>
          {children}
        </div>
      </div>
    </nav>
  );
};

export default Header;
