"use client";

import { Suspense, lazy } from "react";
import type { Application } from "@splinetool/runtime";

const Spline = lazy(() => import("@splinetool/react-spline"));

interface SplineSceneProps {
  scene: string;
  className?: string;
}

function handleLoad(spline: Application) {
  // This placeholder public scene bakes its dark backdrop into the scene's
  // own materials/lighting rather than the canvas clear-color, so this only
  // gets us partway there. Swap in your own Spline export (Background set
  // to "None" at export time) for a fully transparent result.
  spline.setBackgroundColor("transparent");
}

/**
 * Lazy-loaded Spline embed for the hero's interactive 3D visual.
 * Swap the `scene` prop for your own exported Spline scene URL whenever it's ready —
 * nothing else in the Hero needs to change.
 */
export function SplineScene({ scene, className }: SplineSceneProps) {
  return (
    <Suspense
      fallback={
        <div className="flex h-full w-full items-center justify-center">
          <span className="spline-loader" aria-hidden />
        </div>
      }
    >
      <Spline
        scene={scene}
        className={className}
        style={{ background: "transparent" }}
        onLoad={handleLoad}
      />
    </Suspense>
  );
}
