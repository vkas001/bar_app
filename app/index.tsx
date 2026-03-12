import { useIsMobile } from "../hooks/useIsMobile";
import { Redirect } from "expo-router";

export default function RootIndex() {
  const isMobile = useIsMobile();

   return <Redirect href="/auth" />;
}
