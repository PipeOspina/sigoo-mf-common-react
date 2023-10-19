import { DrawerGroup } from "@/components/molecules";
import { useAppSelector } from "@/hooks";
import { Collapse, Divider, List } from "@mui/material";
import { useId } from "react";
import { TransitionGroup } from "react-transition-group";

export const DrawerLists = () => {
  const groupIds = useAppSelector(
    (state) => state.drawer.items.map(({ id }) => id),
    {
      equalityFn: (prev, current) => {
        return (
          prev.length === current.length &&
          prev.every((id, index) => id === current[index])
        );
      },
    }
  );

  const id = useId();

  return (
    <TransitionGroup>
      {groupIds.map((groupId, index) => (
        <Collapse key={`DRAWER_LIST_${id}_${groupId}`}>
          <List>
            <DrawerGroup id={groupId} />
          </List>
          {index !== groupIds.length - 1 && <Divider />}
        </Collapse>
      ))}
    </TransitionGroup>
  );
};
