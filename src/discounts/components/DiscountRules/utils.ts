import { type ChannelFragment } from "@dashboard/graphql";
import { type Option } from "@saleor/macaw-ui-next";

export const getCurencySymbol = (
  selectedChannels: Option[] | null,
  channels: ChannelFragment[],
) => {
  const selectedChannelIds = selectedChannels?.map(channel => channel.value) ?? [];
  const selectedChannelsData = channels.filter(channel => selectedChannelIds.includes(channel.id));
  const currencies = new Set(selectedChannelsData?.map(channel => channel.currencyCode));

  if (currencies.size === 1) {
    return [...currencies][0];
  }

  return "";
};
