declare module 'vanta/dist/vanta.globe.min' {
  import * as THREE from 'three';
  
  interface VantaGlobeConfig {
    el: HTMLElement;
    THREE: typeof THREE;
    mouseControls?: boolean;
    touchControls?: boolean;
    gyroControls?: boolean;
    minHeight?: number;
    minWidth?: number;
    scale?: number;
    scaleMobile?: number;
    color?: number;
    backgroundColor?: number;
    size?: number;
  }

  interface VantaEffect {
    destroy: () => void;
  }

  export default function GLOBE(config: VantaGlobeConfig): VantaEffect;
}