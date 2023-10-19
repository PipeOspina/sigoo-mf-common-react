import {
  DrawerItem,
  DrawerItemLabel,
  DrawerState,
  isDrawerItemLabel,
} from "@/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ReactNode } from "react";

const initialState: DrawerState = {
  items: [],
  open: true,
};

const buildItemState = (item: DrawerItem): DrawerItem => ({
  ...item,
  children: item.children?.map(buildItemState) ?? [],
  disabled: item.disabled ?? false,
});

const addItemMap = (
  currentItem: DrawerItem,
  newItem: DrawerItem,
  parentId: string
): DrawerItem => {
  if (currentItem.id === parentId) {
    return {
      ...currentItem,
      children: [...(currentItem.children ?? []), newItem],
    };
  }

  return {
    ...currentItem,
    children: currentItem.children?.map((item) =>
      addItemMap(item, newItem, parentId)
    ),
  };
};

const updateItemMap = (
  currentItem: Partial<DrawerItem>,
  newItem: Partial<DrawerItem> & { id: string }
): DrawerItem => {
  const newChildren = currentItem.children?.map((item) =>
    updateItemMap(item, newItem)
  );

  const newLabel =
    isDrawerItemLabel(newItem.label) && isDrawerItemLabel(currentItem.label)
      ? { ...currentItem.label, ...newItem.label }
      : newItem.label;

  const currentOpen = newItem.active ? undefined : currentItem.open;

  return currentItem.id === newItem.id
    ? ({
        ...currentItem,
        ...newItem,
        ...(newLabel ? { label: newLabel } : {}),
      } as DrawerItem)
    : ({
        ...currentItem,
        children: newChildren,
        open: currentOpen,
      } as DrawerItem);
};

const removeItemReduce = (
  prevItems: DrawerItem[],
  currentItem: DrawerItem,
  id: string
): DrawerItem[] => {
  if (currentItem.id === id) {
    return prevItems;
  }

  const newChildren = currentItem.children?.reduce((prev, current) => {
    return removeItemReduce(prev, current, id);
  }, [] as DrawerItem[]);

  return [...prevItems, { ...currentItem, children: newChildren }];
};

export const drawerSlice = createSlice({
  initialState,
  name: "drawer",
  reducers: {
    setOpen: (state, { payload }: PayloadAction<boolean>) => {
      state.open = payload;
    },
    setItems: (
      state,
      { payload }: PayloadAction<Pick<DrawerItem, "id" | "children">[]>
    ) => {
      state.items = payload.map((item) => ({
        ...item,
        children: item.children?.map(buildItemState),
      }));
    },
    addItem: (
      state,
      { payload }: PayloadAction<{ item: DrawerItem; parentId: string }>
    ) => {
      state.items = state.items.map((item) =>
        addItemMap(item as DrawerItem, payload.item, payload.parentId)
      );
    },
    addGroup: (
      state,
      {
        payload,
      }: PayloadAction<{
        group: Pick<DrawerItem, "id" | "children">;
        index?: number;
      }>
    ) => {
      state.items = state.items.reduce(
        (prev, current, index) =>
          typeof payload.index === "number"
            ? index === payload.index
              ? [...prev, payload.group, current]
              : [...prev, current]
            : index === state.items.length - 1
            ? [...prev, current, payload.group]
            : [...prev, current],
        []
      );
    },
    updateItem: (
      state,
      {
        payload,
      }: PayloadAction<
        Partial<
          DrawerItem & { label?: ReactNode | Partial<DrawerItemLabel> }
        > & { id: string }
      >
    ) => {
      state.items = state.items.map((item) => updateItemMap(item, payload));
    },
    removeItem: (state, { payload }: PayloadAction<string>) => {
      state.items = state.items.reduce(
        (prev, current) =>
          removeItemReduce(prev, current as DrawerItem, payload),
        []
      );
    },
  },
});

export const { addItem, removeItem, setItems, setOpen, updateItem, addGroup } =
  drawerSlice.actions;

export const drawerReducer = drawerSlice.reducer;
