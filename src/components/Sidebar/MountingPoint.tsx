import sideBarDefaultLogoDarkMode from "@assets/images/sidebar-deafult-logo-darkMode.png";
import sideBarDefaultLogo from "@assets/images/sidebar-default-logo.png";
import { useLegacyThemeHandler } from "@dashboard/components/Sidebar/user/Controls";
import useShop from "@dashboard/hooks/useShop";
import { Avatar, Box, Text } from "@saleor/macaw-ui-next";

export const MountingPoint = () => {
  const { theme } = useLegacyThemeHandler();
  const logo = theme === "defaultLight" ? sideBarDefaultLogo : sideBarDefaultLogoDarkMode;

  const shop = useShop();

  return (
    <Box display="flex" gap={3} paddingX={4} paddingY={5} alignItems="center">
      <Avatar.Store src={logo} scheme="accent1" size="small" />
      <Box display="flex" flexDirection="column" gap={1}>
        <Text size={3} fontWeight="bold">
          {shop?.name || ""}
        </Text>
        {(!shop?.name.toLowerCase().includes("dajar") || shop?.name.toLowerCase().includes("b2b")) && (
          <a href="https://dashboard.dajar.eu" target="_blank" rel="noreferrer">
            <Text size={3}>Dashboard Dajar</Text>
          </a>
        )}
        {!shop?.name.toLowerCase().includes("ambition") && (
          <a href="https://dashboard.ambitionhome.com" target="_blank" rel="noreferrer">
            <Text size={3}>Dashboard Ambition</Text>
          </a>
        )}
        {!shop?.name.toLowerCase().includes("b2b") && (
          <a href="https://dashboard.dajarb2b.pl" target="_blank" rel="noreferrer">
            <Text size={3}>Dashboard B2B</Text>
          </a>
        )}
        {!shop?.name.toLowerCase().includes("patio") && (
          <a href="https://dashboard.patio.garden" target="_blank" rel="noreferrer">
            <Text size={3}>Dashboard Patio</Text>
          </a>
        )}
        {!shop?.name.toLowerCase().includes("marketplace") && (
          <a href="https://dashboard.dajar.pro" target="_blank" rel="noreferrer">
            <Text size={3}>Dashboard Marketplace</Text>
          </a>
        )}
      </Box>
    </Box>
  );
};
