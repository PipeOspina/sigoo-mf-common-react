import { FC, PropsWithChildren, useCallback, useId, useState } from "react";
import { LoadingContext } from "./LoadingContext";

export type LoadingProviderProps = PropsWithChildren<{}>;

export const LoadingProvider: FC<LoadingProviderProps> = <
  Reasons extends string = string
>(
  props
) => {
  const { children } = props;

  const [state, setState] = useState<{
    loading: boolean;
    reasons: Reasons[];
  }>({
    loading: true,
    reasons: ["auth" as Reasons],
  });

  const defaultReasonId = useId() as Reasons;

  const setLoading = useCallback(
    (value: boolean, ...reasons: Reasons[]) => {
      setState(({ reasons: currentReasons }) => {
        const newReasons = value
          ? [
              ...currentReasons,
              ...(reasons.length ? reasons : [defaultReasonId]),
            ].filter((reason, index, array) => array.indexOf(reason) === index)
          : currentReasons.filter(
              (reason) =>
                !(reasons.length ? reasons : [defaultReasonId]).includes(reason)
            );

        return {
          loading: newReasons.length > 0,
          reasons: newReasons,
        };
      });
    },
    [defaultReasonId]
  );

  return (
    <LoadingContext.Provider
      value={{
        ...state,
        setLoading,
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
};
