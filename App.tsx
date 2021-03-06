import React from "react";
import { StatusBar } from "react-native";
import { ThemeProvider } from "styled-components";
import "intl";
import "intl/locale-data/jsonp/en-US";

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

import theme from "./src/global/styles/theme";
import { Register } from "./src/screens/Register";
import AppLoading from "expo-app-loading";

import { NavigationContainer } from "@react-navigation/native";
import { AppRoutes } from "./src/Routes/app.routes";

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <StatusBar barStyle="light-content" />
        <AppRoutes />
      </NavigationContainer>
    </ThemeProvider>
  );
}
