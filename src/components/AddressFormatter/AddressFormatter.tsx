import { Skeleton, Text } from "@saleor/macaw-ui-next";

import { AddressType } from "../../customers/types";

interface AddressFormatterProps {
  address?: AddressType;
}

const AddressFormatter = ({ address }: AddressFormatterProps) => {
  if (!address) {
    return <Skeleton />;
  }

  const vatId = address.metadata.find(meta => meta.key === "vat_id")?.value;

  return (
    <address
      data-test-id="address"
      style={{
        fontStyle: "inherit",
      }}
    >
      <Text as="p" data-test-id="name">
        {address.firstName} {address.lastName}
      </Text>
      <Text as="p" data-test-id="phone">
        {address.phone}
      </Text>
      {address.companyName && (
        <Text as="p" data-test-id="company-name">
          {address.companyName}
        </Text>
      )}
      <Text as="p" data-test-id="addressLines">
        {address.streetAddress1}
        <br />
        {address.streetAddress2}
      </Text>
      <Text as="p" data-test-id="postal-code-and-city">
        {" "}
        {address.postalCode} {address.city}
        {address.cityArea ? ", " + address.cityArea : ""}
      </Text>
      <Text as="p" data-test-id="country-area-and-country">
        {address.countryArea
          ? address.countryArea + ", " + address.country.country
          : address.country.country}
      </Text>
      {vatId && (
        <Text as="p" data-test-id="vat-id">
          VAT ID: {vatId}
        </Text>
      )}
    </address>
  );
};

AddressFormatter.displayName = "AddressFormatter";
export default AddressFormatter;
