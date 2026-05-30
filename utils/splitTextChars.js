/**
 * Free alternative to GSAP SplitText — wraps each character in a span for animation.
 */
export function splitIntoChars(element) {
  if (!element) return [];

  const text = element.textContent ?? "";
  element.setAttribute("data-split-original", text);
  element.textContent = "";
  element.setAttribute("aria-label", text);

  const chars = [];
  [...text].forEach((char) => {
    const span = document.createElement("span");
    span.className = "inline-block";
    span.textContent = char === " " ? "\u00A0" : char;
    element.appendChild(span);
    chars.push(span);
  });

  return chars;
}

export function revertSplit(element) {
  if (!element) return;
  const original = element.getAttribute("data-split-original");
  if (original != null) {
    element.textContent = original;
    element.removeAttribute("data-split-original");
    element.removeAttribute("aria-label");
  }
}
