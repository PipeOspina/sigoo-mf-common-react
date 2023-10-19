import { DrawerListItem } from "@/components/atoms/DrawerListItem/DrawerListItem";
import { useItemState } from "@/hooks/drawer";
import { Collapse } from "@mui/material";
import { FC, useId } from "react";
import { TransitionGroup } from "react-transition-group";

export type DrawerGroupProps = {
  id: string;
};

export const DrawerGroup: FC<DrawerGroupProps> = (props) => {
  const { id } = props;

  const [state] = useItemState(id);

  const componentId = useId();

  return (
    <TransitionGroup>
      {(state.children ?? []).map(({ id: childrenId }) => (
        <Collapse key={`DRAWER_GROUP_${componentId}_${childrenId}`}>
          <DrawerListItem id={childrenId} />
        </Collapse>
      ))}
    </TransitionGroup>
  );
};
