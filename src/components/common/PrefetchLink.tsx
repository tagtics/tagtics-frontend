import { NavLink, NavLinkProps } from "react-router-dom";
import { RouteLoaderKey, prefetchRoute } from "@/config/routeLoaders";

interface PrefetchLinkProps extends NavLinkProps {
  prefetchKey?: RouteLoaderKey;
}

export function PrefetchLink({ prefetchKey, ...props }: PrefetchLinkProps) {
  const handleMouseEnter = () => {
    if (prefetchKey) {
      // Trigger the dynamic import
      prefetchRoute(prefetchKey);
    }
  };

  return (
    <NavLink
      {...props}
      onMouseEnter={(e) => {
        handleMouseEnter();
        props.onMouseEnter?.(e);
      }}
    />
  );
}
