declare module "@cm-sigoo/common-react" {
  type FC<P = {}> = import("react").FC<P>;
  type PropsWithChildren<P = {}> = import("react").PropsWithChildren<P>;

  type Theme = import("@mui/material").Theme;

  // Components
  /// Atoms
  const Logo: FC<import("react").SVGProps<SVGSVGElement>>;
  /// Molecules
  /// Organisms
  const AppLayout: FC<
    PropsWithChildren<{
      label?: string;
      theme?: Theme;
      search?: boolean;
      searchValue?: string;
      onSearchChange?: (value: string) => void;
    }>
  >;

  // Hooks
  const useLoading: <Reasons extends string>(
    ...reasons: Reasons[]
  ) => {
    globalLoading: boolean;
    reasons: Reasons[];
    loading: boolean;
    setLoading: (value: boolean, ...anotherReasons: Reasons[]) => void;
  };

  // Utils
  const theme: Theme;

  export { AppLayout, Logo, theme, useLoading };
}
