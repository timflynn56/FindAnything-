(() => {
  const key = "findanything.welcomeTutorial.dismissed.v1";
  const dialog = document.querySelector("#welcome-tutorial");
  const watch = document.querySelector("#watch-demo");
  const video = dialog.querySelector("video");
  const error = dialog.querySelector("#tutorial-error");
  let returnFocus;

  const loadVideo = () => {
    error.hidden = true;
    video.hidden = false;
    video.src = video.dataset.src;
    video.load();
  };
  const open = () => {
    if (dialog.open) return;
    returnFocus = document.activeElement;
    dialog.showModal();
    loadVideo();
  };

  if (typeof dialog.showModal !== "function") return;
  watch.hidden = false;
  watch.addEventListener("click", open);
  dialog.querySelectorAll("[data-tutorial-close]").forEach(button => {
    button.addEventListener("click", () => dialog.close());
  });
  dialog.addEventListener("close", () => {
    video.pause();
    video.removeAttribute("src");
    video.load();
    try { localStorage.setItem(key, "1"); } catch { /* Storage may be blocked. */ }
    if (returnFocus && returnFocus !== document.body) returnFocus.focus();
    else watch.focus({ preventScroll: true });
  });
  video.addEventListener("error", () => {
    if (!dialog.open) return;
    video.hidden = true;
    error.hidden = false;
  });
  dialog.querySelector("#tutorial-retry").addEventListener("click", () => {
    loadVideo();
    video.focus();
  });

  let dismissed = false;
  try { dismissed = localStorage.getItem(key) === "1"; } catch { /* Storage may be blocked. */ }
  if (!dismissed) open();
})();
