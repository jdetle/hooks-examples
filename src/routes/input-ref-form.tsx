import Card from "@material-ui/core/Card";
import Chip from "@material-ui/core/Chip";
import Grid from "@material-ui/core/Grid";

import TextField from "@material-ui/core/TextField";
import { FieldArray, FieldArrayRenderProps } from "formik";
import React, { useRef, useState } from "react";
import { Formik, FormikProps } from "formik";
export interface ITagValues {
  tags: string[];
}

type ITagArrayProps = {
  theme?: any;
};
const TagCreator = ({ tags }: ITagArrayProps & ITagValues) => {
  const input = useRef<HTMLInputElement>(null);
  const [duplicateError, setDuplicateError] = useState(false);

  const handleNewTag = (
    newTag: string,
    arrayHelpers: FieldArrayRenderProps
  ) => {
    if (newTag !== "" && tags != null && tags.indexOf(newTag) < 0) {
      arrayHelpers.push(newTag);
    }
    if (input != null && input.current != null) {
      input.current.value = "";
    }
    if (tags.indexOf(newTag) >= 0) {
      setDuplicateError(true);
    }
  };

  return (
    <FieldArray name="tags">
      {arrayHelpers => {
        return (
          <Grid container={true} spacing={10}>
            <Grid item={true} xs={12}>
              <TextField
                label="Add Tag"
                inputRef={input}
                error={duplicateError}
                helperText={duplicateError ? "This tag already exists" : ""}
                onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => {
                  // Handle submit on enter keypress
                  setDuplicateError(false);
                  if (e.charCode === 13) {
                    e.preventDefault();
                    const newTag = (e.target as HTMLInputElement).value;
                    handleNewTag(newTag, arrayHelpers);
                  }
                }}
                onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
                  setDuplicateError(false);
                  const newTag = (e.target as HTMLInputElement).value;
                  handleNewTag(newTag, arrayHelpers);
                }}
                fullWidth={true}
                data-cy="tags"
                inputProps={{
                  "data-testid": `tag-input`
                }}
              />
            </Grid>
            <Grid item={true} xs={12}>
              {tags != null &&
                tags.length > 0 &&
                tags.map((tag, index) => {
                  return (
                    <Chip
                      label={tag}
                      key={index}
                      data-testid="tag"
                      onDelete={() => arrayHelpers.remove(index)}
                      style={{ marginRight: "5px" }}
                      variant="outlined"
                    />
                  );
                })}
            </Grid>
          </Grid>
        );
      }}
    </FieldArray>
  );
};

export default () => (
  <div style={{ margin: 40 }}>
    <Card style={{ padding: 10 }}>
      <Formik
        initialValues={{
          tags: ["tag1", "tag2"]
        }}
        onSubmit={() => {}}
      >
        {(props: FormikProps<{ tags: string[] }>) => {
          return <TagCreator tags={props.values.tags} />;
        }}
      </Formik>
    </Card>
  </div>
);
