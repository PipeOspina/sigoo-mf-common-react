import { DrawerItem } from "../Drawer";

export type DrawerState = {
  open: boolean;
  items: Pick<DrawerItem, "id" | "children">[];
};
