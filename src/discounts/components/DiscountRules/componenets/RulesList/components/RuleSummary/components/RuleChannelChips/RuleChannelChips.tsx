import { type Rule } from "@dashboard/discounts/models";
import { Chip } from "@saleor/macaw-ui-next";

interface RuleChannelChipsProps {
  channels: NonNullable<Rule["channels"]>;
}

export const RuleChannelChips = ({ channels }: RuleChannelChipsProps) => {
  return (
    <Chip marginRight={1.5} backgroundColor="accent1Pressed" borderColor="accent1" color="default1">
      {channels.map(c => c.label).join(", ")}
    </Chip>
  );
};
