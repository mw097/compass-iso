import { initDevtools } from "@pixi/devtools";
import { useApplication } from "@pixi/react";
import { useEffect } from "react";

export const DevTools = () => {
  const { app } = useApplication();

  useEffect(() => {
    if (import.meta.env.DEV) {
      initDevtools({ app });
    }
  }, [app]);

  return null;
};
