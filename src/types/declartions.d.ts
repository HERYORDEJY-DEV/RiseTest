declare module "*.svg" {
  import { SvgProps } from "react-native-svg";
  const content: React.FC<SvgProps>;
  export default content;
}

declare module "@env" {
  export const {
    API_BASE_URL,
    API_VERSION_URL,
  }: { API_BASE_URL: string; API_VERSION_URL: string };
}
