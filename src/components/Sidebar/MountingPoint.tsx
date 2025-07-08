import sideBarDefaultLogoDarkMode from "@assets/images/sidebar-deafult-logo-darkMode.png";
import sideBarDefaultLogo from "@assets/images/sidebar-default-logo.png";
import { useLegacyThemeHandler } from "@dashboard/components/Sidebar/user/Controls";
import useShop from "@dashboard/hooks/useShop";
import { Avatar, Box, Text } from "@saleor/macaw-ui-next";
import React from "react";

export const MountingPoint = () => {
  const { theme } = useLegacyThemeHandler();
  const logo = theme === "defaultLight" ? sideBarDefaultLogo : sideBarDefaultLogoDarkMode;

  const shop = useShop();

  return (
    <Box display="flex" gap={3} paddingX={4} paddingY={5} alignItems="center">
      <Avatar.Store src={logo} scheme="accent1" size="small" />
      <Text size={3} fontWeight="bold">
        {shop?.name || ""}
      </Text>
    </Box>
  );
};
