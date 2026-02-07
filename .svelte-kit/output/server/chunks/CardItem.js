import { a8 as attr_class, ac as clsx, a4 as slot, a5 as bind_props } from "./index2.js";
import { c as cn } from "./utils2.js";
import { f as fallback } from "./context.js";
function CardContainer($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let className = fallback($$props["className"], void 0);
    let containerClassName = fallback($$props["containerClassName"], void 0);
    let isMouseEntered = fallback($$props["isMouseEntered"], false);
    $$renderer2.push(`<div${attr_class(clsx(cn("flex items-center justify-center py-20", containerClassName)))} style="perspective: 1000px;"><div${attr_class(clsx(cn("relative flex items-center justify-center transition-all duration-200 ease-linear", className)))} style="transform-style: preserve-3d;"><!--[-->`);
    slot($$renderer2, $$props, "default", { isMouseEntered });
    $$renderer2.push(`<!--]--></div></div>`);
    bind_props($$props, { className, containerClassName, isMouseEntered });
  });
}
function CardBody($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let className = fallback($$props["className"], void 0);
    $$renderer2.push(`<div${attr_class(clsx(cn("h-96 w-96 [transform-style:preserve-3d] [&>*]:[transform-style:preserve-3d]", className)))}><!--[-->`);
    slot($$renderer2, $$props, "default", {});
    $$renderer2.push(`<!--]--></div>`);
    bind_props($$props, { className });
  });
}
function CardItem($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let className = fallback($$props["className"], void 0);
    let translateX = fallback($$props["translateX"], 0);
    let translateY = fallback($$props["translateY"], 0);
    let translateZ = fallback($$props["translateZ"], 0);
    let rotateX = fallback($$props["rotateX"], 0);
    let rotateY = fallback($$props["rotateY"], 0);
    let rotateZ = fallback($$props["rotateZ"], 0);
    let isMouseEntered = fallback($$props["isMouseEntered"], false);
    $$renderer2.push(`<div${attr_class(clsx(cn("w-fit transition duration-200 ease-linear", className)))}><!--[-->`);
    slot($$renderer2, $$props, "default", {});
    $$renderer2.push(`<!--]--></div>`);
    bind_props($$props, {
      className,
      translateX,
      translateY,
      translateZ,
      rotateX,
      rotateY,
      rotateZ,
      isMouseEntered
    });
  });
}
export {
  CardContainer as C,
  CardBody as a,
  CardItem as b
};
