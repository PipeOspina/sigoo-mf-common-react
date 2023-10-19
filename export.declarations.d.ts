declare module "@cm-sigoo/common-react" {
  // Types
  type FC<P = {}> = import("react").FC<P>;
  type PropsWithChildren<P = {}> = import("react").PropsWithChildren<P>;
  type ReactNode = import("react").ReactNode;
  type ElementType<P = any> = import("react").ElementType<P>;

  type Theme = import("@mui/material").Theme;
  type OverridableTypeMap =
    import("@mui/material/OverridableComponent").OverridableTypeMap;
  type OverridableComponent<TypeMap extends OverridableTypeMap> =
    import("@mui/material/OverridableComponent").OverridableComponent<TypeMap>;
  type SvgIconTypeMap<
    AdditionalProps = {},
    RootComponent extends ElementType<any> = "svg"
  > = import("@mui/material").SvgIconTypeMap<AdditionalProps, RootComponent>;
  type SvgIconProps = import("@mui/material").SvgIconProps;

  type DrawerItemLabel = {
    primary: ReactNode;
    secondary?: ReactNode;
  };

  type DrawerItem = {
    id: string;
    label: ReactNode | DrawerItemLabel;
    Icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> | FC<SvgIconProps>;
    open?: boolean;
    active?: boolean;
    children?: DrawerItem[];
    disabled?: boolean;
    onClick?: () => void;
  };

  type DrawerItemToUpdate = Partial<
    Omit<DrawerItem, "id"> & {
      label?: ReactNode | Partial<DrawerItemLabel>;
    }
  >;

  type ReturnDrawerItem = Partial<Omit<DrawerItem, "children">> & {
    children?: { id?: string }[];
    hasActiveChildren?: boolean;
  };

  type ReturnDrawerUpdate = (
    value:
      | DrawerItemToUpdate
      | ((state: DrawerItemToUpdate) => DrawerItemToUpdate)
  ) => void;

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
  const useDrawer: () => {
    open: boolean;
    setOpen: (value: boolean | ((state: boolean) => boolean)) => void;
    getItems: () => DrawerItem[][];
    setItems: (value: DrawerItem[][]) => void;
    addItem: (item: DrawerItem, parent?: number | string) => void;
    removeItem: (id: string) => void;
    removeGroup: (index: number) => void;
    updateItem: (
      id: string,
      item: Partial<
        Omit<DrawerItem, "id"> & {
          label?: ReactNode | Partial<DrawerItemLabel>;
        }
      >
    ) => void;
    addGroup: (group: DrawerItem[], index?: number) => void;
  };
  const useItemState: (id: string) => [ReturnDrawerItem, ReturnDrawerUpdate];

  // Utils
  const theme: Theme;

  export { AppLayout, Logo, theme, useDrawer, useItemState, useLoading };
}
