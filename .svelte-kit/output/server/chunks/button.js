import { a7 as attributes, a2 as clsx } from "./index2.js";
import { c as cn } from "./utils2.js";
function Button($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      variant = "default",
      size = "default",
      href,
      class: className,
      type = "button",
      disabled = false,
      children,
      onclick,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    const baseStyles = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50";
    const variants = {
      default: "bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-[0_0_24px_hsl(var(--primary)/0.35)]",
      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
      outline: "border border-border bg-transparent hover:border-primary/50 hover:bg-accent hover:text-accent-foreground",
      ghost: "hover:bg-accent hover:text-accent-foreground",
      link: "text-primary underline-offset-4 hover:underline"
    };
    const sizes = {
      default: "h-10 px-4 py-2",
      sm: "h-9 px-3",
      lg: "h-11 px-8",
      icon: "h-10 w-10"
    };
    const classes = cn(baseStyles, variants[variant], sizes[size], className);
    if (href) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<a${attributes({ href, class: clsx(classes), ...restProps })}>`);
      if (children) {
        $$renderer2.push("<!--[-->");
        children($$renderer2);
        $$renderer2.push(`<!---->`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></a>`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<button${attributes({ type, disabled, class: clsx(classes), ...restProps })}>`);
      if (children) {
        $$renderer2.push("<!--[-->");
        children($$renderer2);
        $$renderer2.push(`<!---->`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></button>`);
    }
    $$renderer2.push(`<!--]-->`);
  });
}
export {
  Button as B
};
