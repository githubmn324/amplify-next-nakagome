/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { Tag } from "../models";
import { fetchByPath, validateField } from "./utils";
import { DataStore } from "aws-amplify";
export default function TagUpdateForm(props) {
  const {
    id: idProp,
    tag: tagModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    label: "",
    labelColor: "",
  };
  const [label, setLabel] = React.useState(initialValues.label);
  const [labelColor, setLabelColor] = React.useState(initialValues.labelColor);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = tagRecord
      ? { ...initialValues, ...tagRecord }
      : initialValues;
    setLabel(cleanValues.label);
    setLabelColor(cleanValues.labelColor);
    setErrors({});
  };
  const [tagRecord, setTagRecord] = React.useState(tagModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp ? await DataStore.query(Tag, idProp) : tagModelProp;
      setTagRecord(record);
    };
    queryData();
  }, [idProp, tagModelProp]);
  React.useEffect(resetStateValues, [tagRecord]);
  const validations = {
    label: [{ type: "Required" }],
    labelColor: [{ type: "Required" }],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          label,
          labelColor,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value.trim() === "") {
              modelFields[key] = undefined;
            }
          });
          await DataStore.save(
            Tag.copyOf(tagRecord, (updated) => {
              Object.assign(updated, modelFields);
            })
          );
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            onError(modelFields, err.message);
          }
        }
      }}
      {...getOverrideProps(overrides, "TagUpdateForm")}
      {...rest}
    >
      <TextField
        label="Label"
        isRequired={true}
        isReadOnly={true}
        value={label}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              label: value,
              labelColor,
            };
            const result = onChange(modelFields);
            value = result?.label ?? value;
          }
          if (errors.label?.hasError) {
            runValidationTasks("label", value);
          }
          setLabel(value);
        }}
        onBlur={() => runValidationTasks("label", label)}
        errorMessage={errors.label?.errorMessage}
        hasError={errors.label?.hasError}
        {...getOverrideProps(overrides, "label")}
      ></TextField>
      <TextField
        label="Label color"
        isRequired={true}
        isReadOnly={true}
        value={labelColor}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              label,
              labelColor: value,
            };
            const result = onChange(modelFields);
            value = result?.labelColor ?? value;
          }
          if (errors.labelColor?.hasError) {
            runValidationTasks("labelColor", value);
          }
          setLabelColor(value);
        }}
        onBlur={() => runValidationTasks("labelColor", labelColor)}
        errorMessage={errors.labelColor?.errorMessage}
        hasError={errors.labelColor?.hasError}
        {...getOverrideProps(overrides, "labelColor")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || tagModelProp)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(idProp || tagModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
