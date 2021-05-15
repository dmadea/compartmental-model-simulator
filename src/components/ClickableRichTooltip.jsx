// Stolen from https://codesandbox.io/s/popper-with-arrow-58jhe?file=/src/App.tsx:496-536
// import { PopperPlacementType } from "@material-ui/core";
import React, { useState } from "react";
import RichTooltip from "./RichTooltip";

const ClickableRichTooltip = ({
  placement,
  arrow,
  content,
  children,
  disabled = false
}) => {
  const [open, setOpen] = useState(false);

  if (disabled) {
    return React.cloneElement(children, { ...children.props, disabled: true });
  }

  const existingOnClick = children.props.onClick;
  const newOnClick = (e) => {
    setOpen(!open);
    existingOnClick && existingOnClick(e);
  };

  const contentNode = typeof content === "function" ? content() : content;

  return (
    <RichTooltip
      open={open}
      onClose={() => setOpen(false)}
      arrow={arrow}
      placement={placement}
      content={contentNode}
    >
      {React.cloneElement(children, { ...children.props, onClick: newOnClick })}
    </RichTooltip>
  );
};

export default ClickableRichTooltip;
