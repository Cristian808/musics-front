import React from "react";
import { TextField, Tooltip } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";

const TooltipInput = (props) => {
  return props.msgTooltip ? (
    <Tooltip
      title={<div style={{ fontSize: 12 }}>{props.msgTooltip}</div>}
      placement="bottom"
      PopperProps={{ style: { zIndex: 4000 } }}
    >
      {props.children}
    </Tooltip>
  ) : (
    props.children
  );
};

const CustomTextField = ({ msgTooltip, loadingField, ...props }) => {
  return loadingField ? (
    <Skeleton variant="rect" width={"100%"} height={44.41} />
  ) : (
    <TooltipInput msgTooltip={msgTooltip}>
      <TextField {...props} fullWidth />
    </TooltipInput>
  );
};

CustomTextField.defaultProps = {
  variant: "outlined",
};

export default CustomTextField;
