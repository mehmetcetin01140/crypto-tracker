import { useEffect } from "react";
export const CreateUseScroll = (param: string | number | undefined) => {
  return () => {
    useEffect(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }, [param]);
  };
};
