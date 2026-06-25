export function openWaitlist() {
  window.scrollTo({ top: 0, behavior: "smooth" });
  setTimeout(() => {
    window.dispatchEvent(new CustomEvent("prepify:open-waitlist"));
  }, 350);
}
