import { useCallback, useContext } from "react";
import { LoadingContext, LoadingContextType } from "../contexts";

export const useLoading = <Reasons extends string>(...reasons: Reasons[]) => {
  const {
    loading,
    reasons: contextReasons,
    setLoading,
  } = useContext(LoadingContext as LoadingContextType<Reasons>);

  const handleChangeLoading = useCallback(
    (value: boolean, ...anotherReasons: Reasons[]) => {
      setLoading(value, ...reasons, ...anotherReasons);
    },
    [reasons, setLoading]
  );

  return {
    globalLoading: loading,
    reasons: contextReasons,
    loading: reasons.length
      ? contextReasons.some((currentReason) => reasons.includes(currentReason))
      : loading,
    setLoading: handleChangeLoading,
  };
};
