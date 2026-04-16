import { useUserPermissions } from "@dashboard/auth/hooks/useUserPermissions";
import { hasPermissions } from "@dashboard/components/RequirePermissions";
import { PermissionEnum } from "@dashboard/graphql";
import { useState } from "react";

type RefundType = "standard" | "manual" | "product-refund";

export const useOrderRefundDialog = () => {
  const [selectedRefundType, setSelected] = useState<RefundType>("product-refund");

  const userPermissions = useUserPermissions();
  const canCreateManualRefund = hasPermissions(userPermissions ?? [], [
    PermissionEnum.HANDLE_PAYMENTS,
  ]);
  const handleChangeRefundType = (val: string) => {

    if (val === "product-refund") {
      setSelected("product-refund");
    }

    if (val === "standard" && canCreateManualRefund) {
      setSelected("standard");
    }

    if (val === "manual" && canCreateManualRefund) {
      setSelected("manual");
    }
  };

  return {
    selectedRefundType,
    handleChangeRefundType,
    canCreateManualRefund,
  };
};
