declare module "@cm-sigoo/utilities" {
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
    }>
  >;

  // Utils
  const theme: Theme;

  export { AppLayout, Logo, theme };
}
