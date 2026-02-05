import { a1 as attr_class, a2 as clsx } from "./index2.js";
import { c as cn } from "./utils2.js";
function Tag($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { class: className, children } = $$props;
    $$renderer2.push(`<span${attr_class(clsx(cn("inline-flex items-center rounded-md bg-secondary px-2 py-1 text-xs font-medium text-muted-foreground", className)))}>`);
    if (children) {
      $$renderer2.push("<!--[-->");
      children($$renderer2);
      $$renderer2.push(`<!---->`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></span>`);
  });
}
export {
  Tag as T
};
