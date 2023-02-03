import { getPageContent, onLinkNavigate } from "./utils.js";

function getAnchorClass(toPath) {
  return toPath.replace("/pages/", "").replace(".html", "");
}

const getTartgetImage = () => {
  return document.querySelector(".photo-detail").querySelector("img");
};

onLinkNavigate(async ({ toPath }) => {
  const content = await getPageContent(toPath);
  const anchorClass = getAnchorClass(toPath);

  const clickOrigin = document
    .querySelector(`.${anchorClass}`)
    .querySelector("img");
  clickOrigin.style.viewTransitionName = `banner-img`;

  startViewTransition(clickOrigin, () => {
    document.body.innerHTML = content;
    const targetImage = getTartgetImage();
    targetImage.style.viewTransitionName = "banner-img";
  });
});

function startViewTransition(clickOrigin, callback) {
  if (!document.startViewTransition) {
    callback();
    return;
  }

  const transition = document.startViewTransition(callback);
  transition.finished.finally(() => {
    const targetImage = getTartgetImage();
    if (targetImage) targetImage.style.viewTransitionName = "";
    if (clickOrigin) clickOrigin.style.viewTransitionName = "";
  });
}
