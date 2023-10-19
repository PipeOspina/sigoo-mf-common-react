import {
  addGroup as addDrawerGroup,
  addItem as addDrawerItem,
  removeItem as removeDrawerItem,
  setItems as setDrawerItems,
  setOpen as setOpenDrawer,
  store,
  updateItem as updateDrawerItem,
} from "@/redux";
import { DrawerItem, DrawerItemLabel } from "@/types";
import { ReactNode, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import { useAppDispatch, useAppSelector } from "../redux";

export const useDrawer = () => {
  const open = useAppSelector((state) => state.drawer.open);
  const dispatch = useAppDispatch();

  const setOpen = useCallback(
    (value: ((state: boolean) => boolean) | boolean) => {
      const dispatchValue =
        typeof value === "function"
          ? value(store.getState().drawer.open)
          : value;
      dispatch(setOpenDrawer(dispatchValue));
    },
    []
  );

  const getItems = useCallback(() => {
    return store.getState().drawer.items.map(({ children }) => children);
  }, []);

  const setItems = useCallback((value: DrawerItem[][]) => {
    dispatch(
      setDrawerItems(
        value.map((group) => ({
          id: uuidv4(),
          children: group,
        }))
      )
    );
  }, []);

  const addItem = useCallback(
    (item: DrawerItem, parent: number | string = 0) => {
      const parentId =
        typeof parent === "number"
          ? store.getState().drawer.items[parent].id
          : parent;
      dispatch(
        addDrawerItem({
          item,
          parentId,
        })
      );
    },
    []
  );

  const removeItem = useCallback((id: string) => {
    dispatch(removeDrawerItem(id));
  }, []);

  const removeGroup = useCallback((index: number) => {
    const id = store.getState().drawer.items[index].id;
    dispatch(removeDrawerItem(id));
  }, []);

  const addGroup = useCallback((group: DrawerItem[], index?: number) => {
    dispatch(
      addDrawerGroup({
        group: {
          id: uuidv4(),
          children: group,
        },
        index,
      })
    );
  }, []);

  const updateItem = useCallback(
    (
      id: string,
      item: Partial<
        Omit<DrawerItem, "id"> & {
          label?: ReactNode | Partial<DrawerItemLabel>;
        }
      >
    ) => {
      dispatch(updateDrawerItem({ id, ...item }));
    },
    []
  );

  return {
    open,
    setOpen,
    getItems,
    setItems,
    addItem,
    removeItem,
    removeGroup,
    updateItem,
    addGroup,
  };
};
