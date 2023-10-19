import { useItemState } from "@/hooks/drawer";
import { isDrawerItemLabel } from "@/types";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Zoom,
} from "@mui/material";
import { FC, useCallback, useId, useMemo } from "react";
import { TransitionGroup } from "react-transition-group";

export type DrawerListItemProps = {
  id: string;
  childrenIndex?: number;
};

export const DrawerListItem: FC<DrawerListItemProps> = (props) => {
  const { id, childrenIndex = 0 } = props;

  const [state, updateState] = useItemState(id);

  const {
    Icon,
    children,
    label,
    active,
    disabled,
    onClick,
    open,
    hasActiveChildren,
  } = state;

  const componentId = useId();

  const isOpen = useMemo(
    () => (open !== undefined ? open : hasActiveChildren),
    [hasActiveChildren, open]
  );
  const isActive = useMemo(
    () => (active !== undefined ? active : hasActiveChildren && !isOpen),
    [active, hasActiveChildren, isOpen]
  );

  const hasChildren = useMemo(() => Boolean(children?.length), [children]);

  const { primary, secondary } = useMemo(
    () =>
      isDrawerItemLabel(label)
        ? label
        : { primary: label, secondary: undefined },
    [label]
  );

  const handleClick = useCallback(() => {
    if (hasChildren) updateState({ open: !isOpen });
    onClick?.();
  }, [isOpen, hasChildren, onClick, updateState]);

  return (
    <>
      <ListItemButton
        onClick={handleClick}
        disabled={disabled}
        selected={isActive}
        sx={{ pl: 2 + childrenIndex * 2 }}
      >
        <ListItemIcon>
          {Icon ? <Icon color={isActive ? "primary" : undefined} /> : null}
        </ListItemIcon>
        <ListItemText
          primary={primary}
          secondary={secondary}
          primaryTypographyProps={{ color: isActive ? "primary" : "initial" }}
          secondaryTypographyProps={{ color: isActive ? "primary" : "initial" }}
        />
        <Zoom in={hasChildren}>
          {isOpen ? (
            <ExpandLessIcon />
          ) : (
            <ExpandMoreIcon color={isActive ? "primary" : undefined} />
          )}
        </Zoom>
      </ListItemButton>
      <Collapse in={isOpen}>
        <List component="div" disablePadding>
          <TransitionGroup>
            {(children ?? []).map(({ id: childrenId }) => (
              <Collapse key={`DRAWER_LIST_ITEM_${componentId}_${childrenId}`}>
                <DrawerListItem
                  id={childrenId}
                  childrenIndex={childrenIndex + 1}
                />
              </Collapse>
            ))}
          </TransitionGroup>
        </List>
      </Collapse>
    </>
  );
};
