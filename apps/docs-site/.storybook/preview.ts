import type { Preview } from "@storybook/react-vite";
import React from "react";
import { HighlightedCodeBlock } from "./HighlightedCodeBlock";
import "./highlight-theme.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo",
    },

    docs: {
      components: {
        pre: (props: React.ComponentProps<"pre">) => {
          const child = React.Children.only(props.children) as unknown;

          if (
            React.isValidElement(child) &&
            typeof child.type === "string" &&
            child.type.toLowerCase() === "code"
          ) {
            const className = (child.props as { className?: string }).className;
            const rawChildren = (child.props as { children?: unknown }).children;
            const code =
              typeof rawChildren === "string" || typeof rawChildren === "number"
                ? String(rawChildren)
                : Array.isArray(rawChildren)
                  ? rawChildren.join("")
                  : "";

            const language =
              typeof className === "string"
                ? className
                    .split(/\s+/)
                    .find((c) => c.startsWith("language-"))
                    ?.replace(/^language-/, "")
                : undefined;

            return React.createElement(HighlightedCodeBlock, {
              code: code.replace(/\n$/, ""),
              language,
              className: props.className,
            });
          }

          return React.createElement("pre", { ...props });
        },
      },
    },
  },
};

export default preview;
