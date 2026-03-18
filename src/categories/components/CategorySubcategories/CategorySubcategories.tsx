import { categoryAddUrl } from "@dashboard/categories/urls";
import { BulkDeleteButton } from "@dashboard/components/BulkDeleteButton";
import { DashboardCard } from "@dashboard/components/Card";
import { InternalLink } from "@dashboard/components/InternalLink";
import { CategoryDetailsQuery, PermissionEnum } from "@dashboard/graphql";
import { ListProps, ListViews, RelayToFlat } from "@dashboard/types";
import { Box, Button } from "@saleor/macaw-ui-next";
import { FormattedMessage } from "react-intl";

import { CategoryListDatagrid } from "../CategoryListDatagrid";
import { useUser } from "@dashboard/auth";
import { hasPermission } from "@dashboard/auth/misc";

interface CategorySubcategoriesProps
  extends Pick<ListProps<ListViews.CATEGORY_LIST>, "onUpdateListSettings" | "settings"> {
  categoryId: string;
  disabled: boolean;
  subcategories: RelayToFlat<NonNullable<CategoryDetailsQuery["category"]>["children"]>;
  onCategoriesDelete: () => void;
  onSelectCategoriesIds: (ids: number[], clearSelection: () => void) => void;
}

export const CategorySubcategories = ({
  categoryId,
  subcategories,
  disabled,
  onCategoriesDelete,
  onSelectCategoriesIds,
  settings,
  onUpdateListSettings,
}: CategorySubcategoriesProps) => {

  const {user} = useUser();
  const canEdit = user && hasPermission(PermissionEnum.MANAGE_MENUS, user);

  return (
    <DashboardCard>
      <DashboardCard.Header>
        <DashboardCard.Title>
          <FormattedMessage
            id="NivJal"
            defaultMessage="All Subcategories"
            description="section header"
          />
        </DashboardCard.Title>
        <DashboardCard.Toolbar>
          <InternalLink to={categoryAddUrl(categoryId)}>
            <Button variant="secondary" data-test-id="create-subcategory">
              <FormattedMessage
                id="UycVMp"
                defaultMessage="Create subcategory"
                description="button"
              />
            </Button>
          </InternalLink>
        </DashboardCard.Toolbar>
      </DashboardCard.Header>

      <CategoryListDatagrid
        settings={settings}
        onUpdateListSettings={onUpdateListSettings}
        categories={subcategories || []}
        disabled={disabled}
        onSelectCategoriesIds={onSelectCategoriesIds}
        selectionActionButton={
          <Box paddingRight={5}>
            <BulkDeleteButton onClick={onCategoriesDelete} disabled={!canEdit}>
              <FormattedMessage defaultMessage="Delete categories" id="FiO/W/" />
            </BulkDeleteButton>
          </Box>
        }
      />
    </DashboardCard>
  );
};
