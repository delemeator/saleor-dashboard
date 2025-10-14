// @ts-strict-ignore
import { CustomerGroupsSearchQuery, StaffErrorFragment } from "@dashboard/graphql";
import { FormChange } from "@dashboard/hooks/useForm";
import { FetchMoreProps, RelayToFlat, SearchPageProps } from "@dashboard/types";
import { getFormErrors } from "@dashboard/utils/errors";
import getStaffErrorMessage from "@dashboard/utils/errors/staff";
import { Option, Text } from "@saleor/macaw-ui-next";
import React from "react";
import { useIntl } from "react-intl";

import { Multiselect } from "../Combobox";

export interface AccountCustomerGroupsProps extends FetchMoreProps, SearchPageProps {
  formData: {
    customerGroups: Option[];
  };
  disabled: boolean;
  errors: StaffErrorFragment[];
  availableCustomerGroups: RelayToFlat<CustomerGroupsSearchQuery["search"]>;
  onChange: FormChange;
}

const AccountCustomerGroups: React.FC<AccountCustomerGroupsProps> = props => {
  const {
    availableCustomerGroups,
    disabled,
    errors,
    formData,
    hasMore,
    loading,
    onChange,
    onFetchMore,
    onSearchChange,
  } = props;
  const intl = useIntl();
  const choices = availableCustomerGroups?.map(pg => ({
    disabled: false,
    label: pg.name,
    value: pg.id,
  }));
  const formErrors = getFormErrors(["addCustomerGroups", "removeCustomerGroups"], errors);
  const customerGroupIds = formData.customerGroups.map(group => group.value);

  return (
    <>
      <Multiselect
        label={intl.formatMessage({
          id: "ftF7SB",
          defaultMessage: "Grupy klientów",
        })}
        name="customerGroups"
        options={disabled ? [] : choices}
        value={choices?.filter(choice => customerGroupIds.includes(choice.value))}
        onChange={onChange}
        fetchOptions={onSearchChange}
        fetchMore={{
          onFetchMore,
          hasMore,
          loading,
        }}
        data-test-id="customer-groups"
        error={!!formErrors.addCustomerGroups}
        helperText={getStaffErrorMessage(formErrors.addCustomerGroups, intl)}
      />
      {!!formErrors.addCustomerGroups && (
        <Text color="critical1">{getStaffErrorMessage(formErrors.addCustomerGroups, intl)}</Text>
      )}
      {!!formErrors.removeCustomerGroups && (
        <Text color="critical1">{getStaffErrorMessage(formErrors.removeCustomerGroups, intl)}</Text>
      )}
    </>
  );
};

AccountCustomerGroups.displayName = "AccountCustomerGroups";
export default AccountCustomerGroups;
