import React from "react";
import NumberFormat from "react-number-format";
import { TextField, Tooltip } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  let floatValue = other.value;
  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => (floatValue = values.floatValue)}
      onChange={(e) =>
        onChange({ target: { name: props.name, value: floatValue } })
      }
      thousandSeparator="."
      decimalSeparator=","
    />
  );
}

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

function CustomNumberInput({
  msgTooltip,
  loadingField,
  decimalScale,
  allowNegative,
  fixedDecimalScale,
  type,
  ...props
}) {
  return loadingField ? (
    <Skeleton variant="rect" width={"100%"} height={44.41} />
  ) : (
    <TooltipInput msgTooltip={msgTooltip}>
      <TextField
        {...props}
        InputProps={{
          inputComponent: NumberFormatCustom,
          ...props.InputProps,
        }}
        inputProps={{
          decimalScale: decimalScale,
          allowNegative: allowNegative,
          fixedDecimalScale: fixedDecimalScale,
          autoComplete: "off",
          type: type,
        }}
        fullWidth
      />
    </TooltipInput>
  );
}

CustomNumberInput.defaultProps = {
  fixedDecimalScale: true,
  decimalScale: 2,
  allowNegative: false,
  type: "tel",
  variant: "outlined",
};

export default CustomNumberInput;
