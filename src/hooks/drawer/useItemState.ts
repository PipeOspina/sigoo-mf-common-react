import { store, updateItem } from "@/redux";
import { DrawerItem, DrawerItemLabel } from "@/types";
import { ReactNode, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../redux";

const findItem = (
  items: Pick<DrawerItem, "id" | "children">[],
  id: string
): DrawerItem | undefined => {
  const children = items.map((item) => item.children ?? []).flat();
  return (
    (items.find((item) => item.id === id) as DrawerItem) ??
    (children.length ? findItem(children, id) : undefined)
  );
};

type ItemToUpdate = Partial<
  Omit<DrawerItem, "id"> & {
    label?: ReactNode | Partial<DrawerItemLabel>;
  }
>;

type ReturnItem = Partial<Omit<DrawerItem, "children">> & {
  children?: { id?: string }[];
  hasActiveChildren?: boolean;
};

type ReturnUpdate = (
  value: ItemToUpdate | ((state: ItemToUpdate) => ItemToUpdate)
) => void;

const childrenIsActive = (children?: DrawerItem[]) => {
  return (
    children?.some((item) => item.active || childrenIsActive(item.children)) ??
    false
  );
};

export const useItemState = (id: string): [ReturnItem, ReturnUpdate] => {
  const { children: itemChildren, ...item } =
    useAppSelector(
      (state) => {
        const itemFound = findItem(state.drawer.items, id);
        return {
          ...itemFound,
          hasActiveChildren: childrenIsActive(itemFound?.children),
        };
      },
      {
        stabilityCheck: "never",
        equalityFn: (prev, current) => {
          return (
            prev.Icon === current.Icon &&
            prev.active === current.active &&
            prev.disabled === current.disabled &&
            prev.label === current.label &&
            prev.open === current.open &&
            prev.onClick === current.onClick &&
            prev.children?.length === current.children?.length &&
            prev.hasActiveChildren === current.hasActiveChildren &&
            prev.children?.every(
              (childrenItem, index) =>
                childrenItem.id === current.children?.[index].id
            )
          );
        },
      }
    ) ?? {};

  const dispatch = useAppDispatch();

  const updateState: ReturnUpdate = useCallback(
    (value) => {
      if (typeof value !== "function") {
        dispatch(updateItem({ ...value, id }));
        return;
      }
      const itemFound = findItem(store.getState().drawer.items, id);
      const itemToUpdate = {
        ...itemFound,
        hasActiveChildren: childrenIsActive(itemFound.children),
      };
      dispatch(updateItem({ ...value(itemToUpdate), id }));
    },
    [id]
  );

  return [
    {
      ...item,
      ...(itemChildren
        ? { children: itemChildren?.map(({ id }) => ({ id })) }
        : {}),
    },
    updateState,
  ];
};
