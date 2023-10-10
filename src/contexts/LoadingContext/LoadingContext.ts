import { Context, createContext } from "react";

export type LoadingContextState<Reasons extends string = string> = {
  loading: boolean;
  reasons: Reasons[];
  setLoading: (value: boolean, ...reasons: Reasons[]) => void;
};

export type LoadingContextType<Reasons extends string = string> = Context<
  LoadingContextState<Reasons>
>;

export const LoadingContext = createContext<LoadingContextState<string>>({
  loading: false,
  reasons: [],
  setLoading: () => {},
});
