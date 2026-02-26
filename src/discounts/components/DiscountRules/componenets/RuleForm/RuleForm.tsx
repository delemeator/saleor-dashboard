// import { DEFAULT_INITIAL_SEARCH_DATA } from "@dashboard/config";
import { createEmptyCodition, Rule } from "@dashboard/discounts/models";
import { PromotionTypeEnum, RewardValueTypeEnum } from "@dashboard/graphql";
import { commonMessages } from "@dashboard/intl";
// import useCustomerGroupSearch from "@dashboard/searches/useCustomerGroupSearch";
import { getFormErrors } from "@dashboard/utils/errors";
import { CommonError, getCommonFormFieldErrorMessage } from "@dashboard/utils/errors/common";
// import { mapEdgesToItems } from "@dashboard/utils/maps";
import { RichTextContext } from "@dashboard/utils/richText/context";
import useRichText from "@dashboard/utils/richText/useRichText";
import { Box, Input, Multiselect, Option } from "@saleor/macaw-ui-next";
import { useEffect, useMemo } from "react";
import { useController, useFormContext } from "react-hook-form";
import { useIntl } from "react-intl";

import { useDiscountRulesContext } from "../../context";
import { getCurencySymbol } from "../../utils";
import { RuleConditions } from "./components/RuleConditions";
import { RuleDescription } from "./components/RuleDescription";
import { RuleInputWrapper } from "./components/RuleInputWrapper/RuleInputWrapper";
import { RuleReward } from "./components/RuleReward";

interface RuleFormProps<ErrorCode> {
  errors: Array<CommonError<ErrorCode>>;
  openPlayground: () => void;
}

export const RuleForm = <ErrorCode,>({ errors, openPlayground }: RuleFormProps<ErrorCode>) => {
  const intl = useIntl();
  const { disabled, channels, discountType } = useDiscountRulesContext();
  const { watch, getValues, setValue, formState } = useFormContext<Rule>();
  const formErrors = getFormErrors(["rewardValue"], errors);
  const { trigger } = useFormContext<Rule>();
  const { field: nameField } = useController<Rule, "name">({
    name: "name",
  });
  const { field: channelfield } = useController<Rule, "channels">({
    name: "channels",
  });
  // const { field: groupfield } = useController<Rule, "customerGroups">({
  //   name: "customerGroups",
  // });
  const selectedChannels = watch("channels");
  // const selectedGroups = watch("customerGroups");
  const conditions = watch("conditions");
  const hasSelectedChannel = !!selectedChannels?.length;
  const currencySymbol = getCurencySymbol(selectedChannels, channels);
  const richText = useRichText({
    initial: getValues("description"),
    loading: false,
    triggerChange: trigger,
  });
  const channelOptions = useMemo(
    () =>
      channels.map<Option>(channel => ({
        label: channel.name,
        value: channel.id,
      })),
    [channels],
  );
  // const { result: searchCustomerGroupsOpts } = useCustomerGroupSearch({
  //   variables: DEFAULT_INITIAL_SEARCH_DATA,
  // });

  // const groupOptions = mapEdgesToItems(searchCustomerGroupsOpts.data?.search)?.map(group => {
  //   return { label: group.name, value: group.id };
  // });

  useEffect(() => {
    // Restart reward type to percentage if  no currency
    if (!currencySymbol) {
      setValue("rewardValueType", RewardValueTypeEnum.PERCENTAGE);
    }
  }, [currencySymbol, setValue]);

  const handleChannelsChange = (values: Option[]) => {
    setValue("channels", values, { shouldValidate: true });

    setValue("rewardGifts", []);

    // Restart conditions when catalog promotion
    if (discountType === PromotionTypeEnum.CATALOGUE) {
      if (conditions.length > 0) {
        setValue("conditions", [createEmptyCodition()]);
      }
    }
  };

  return (
    <RichTextContext.Provider value={richText}>
      <Box width="100%" __minHeight={515} __maxHeight="75vh" overflowY="auto">
        <Box display="flex" flexDirection="column" gap={4} marginTop={4}>
          <RuleInputWrapper>
            <Input
              {...nameField}
              data-test-id="rule-name-input"
              disabled={disabled || nameField.disabled}
              size="small"
              label={intl.formatMessage(commonMessages.name)}
              error={!!formState.errors?.name?.message}
              helperText={formState.errors?.name?.message}
            />
          </RuleInputWrapper>
          <RuleInputWrapper>
            <Multiselect
              {...channelfield}
              onChange={handleChannelsChange}
              value={channelfield.value || []}
              label={intl.formatMessage(commonMessages.channel)}
              options={channelOptions}
              error={!!formState.errors?.channels?.message}
              helperText={formState.errors?.channels?.message}
              disabled={disabled || channelfield.disabled}
            />
          </RuleInputWrapper>
          {/* <RuleInputWrapper>
            <Multiselect
              {...groupfield}
              label={"Grupy klientów"}
              options={groupOptions || []}
              value={
                groupOptions?.filter(choice =>
                  selectedGroups?.map(group => group.value).includes(choice.value),
                ) as Option[]
              }
            />
          </RuleInputWrapper> */}

          <RuleConditions
            hasSelectedChannels={hasSelectedChannel}
            openPlayground={openPlayground}
          />

          <RuleReward
            currencySymbol={currencySymbol}
            error={getCommonFormFieldErrorMessage(formErrors.rewardValue, intl)}
          />

          <RuleDescription />

          <button type="submit" hidden>
            Submit
          </button>
        </Box>
      </Box>
    </RichTextContext.Provider>
  );
};
