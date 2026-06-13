declare module "react-simple-maps" {
  import { ComponentType, SVGProps, CSSProperties, ReactNode } from "react";

  export interface ProjectionConfig {
    scale?: number;
    center?: [number, number];
    rotate?: [number, number, number];
  }

  export interface ComposableMapProps {
    width?: number;
    height?: number;
    projection?: string;
    projectionConfig?: ProjectionConfig;
    style?: CSSProperties;
    children?: ReactNode;
  }
  export const ComposableMap: ComponentType<ComposableMapProps>;

  export interface GeographiesProps {
    geography: string | object;
    children: (args: { geographies: GeoObject[] }) => ReactNode;
  }
  export interface GeoObject {
    rsmKey: string;
    [key: string]: unknown;
  }
  export const Geographies: ComponentType<GeographiesProps>;

  export interface GeographyProps extends SVGProps<SVGPathElement> {
    geography: GeoObject;
  }
  export const Geography: ComponentType<GeographyProps>;

  export interface MarkerProps extends SVGProps<SVGGElement> {
    coordinates: [number, number];
    children?: ReactNode;
  }
  export const Marker: ComponentType<MarkerProps>;

  export interface LineProps extends SVGProps<SVGPathElement> {
    from: [number, number];
    to: [number, number];
    coordinates?: Array<[number, number]>;
    stroke?: string;
    strokeWidth?: number;
    strokeLinecap?: string;
    strokeOpacity?: number;
  }
  export const Line: ComponentType<LineProps>;
}
