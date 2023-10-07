import { PaperProvider } from "react-native-paper";
import { RootNavigation } from "./src/navigation";
import { AuthProvider } from "./src/contexts";
import { StatusBar } from "expo-status-bar";

export default function App() {
  return (
    <AuthProvider>
      <StatusBar style="light" backgroundColor="#16222b" />
      <PaperProvider>
        <RootNavigation />
      </PaperProvider>
    </AuthProvider>
  );
}
