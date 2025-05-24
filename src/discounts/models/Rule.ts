import { RewardTypeEnum, RewardValueTypeEnum } from "@dashboard/graphql";
import { Option } from "@saleor/macaw-ui-next";

import { Condition } from "./Condition";

export interface Rule {
  id: string;
  name: string;
  description: string | null;
  channels: Option[] | null;
  customerGroups: Option[] | null;
  rewardType: RewardTypeEnum | null;
  rewardValue: number | null;
  rewardValueType: RewardValueTypeEnum;
  rewardGifts: Option[];
  conditions: Condition[];
  hasPredicateNestedConditions?: boolean;
}

export const createEmptyRule = (): Rule => ({
  id: "",
  name: "",
  description: "",
  channels: null,
  customerGroups: null,
  rewardType: null,
  rewardValue: 0,
  rewardGifts: [],
  rewardValueType: RewardValueTypeEnum.FIXED,
  conditions: [],
  hasPredicateNestedConditions: false,
});
