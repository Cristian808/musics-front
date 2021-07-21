import React from "react";
import { TextField, Tooltip } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
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

function CustomAutocomplete({
  loadingField,
  msgTooltip,
  labelClass,
  ...props
}) {
  return loadingField ? (
    <Skeleton variant="rect" width={"100%"} height={44.41} />
  ) : (
    <Autocomplete
      {...props}
      noOptionsText="Nenhuma opção"
      getOptionSelected={(option, value) => option.value === value.value}
      getOptionLabel={(option) => option.label}
      renderInput={(params) => {
        return (
          <TooltipInput msgTooltip={msgTooltip}>
            <TextField
              {...params}
              placeholder={props.placeholder}
              fullWidth
              variant={props.variant}
              label={props.label}
              InputProps={{
                ...params.InputProps,
                //  endAdornment: (
                //    <>
                //      {!props.options ? (
                //        <div style={{ position: "absolute", right: 10 }}>
                //          <CircularProgress color="inherit" size={15} />{" "}
                //        </div>
                //      ) : null}
                //      {props.loading || props.options
                //        ? params.InputProps.endAdornment
                //        : ""}
                //    </>
                //  ),
                autoComplete: "off",
              }}
            />
          </TooltipInput>
        );
      }}
    />
  );
}

CustomAutocomplete.defaultProps = {
  placeholder: "Selecione...",
  variant: "outlined",
};

export default CustomAutocomplete;
