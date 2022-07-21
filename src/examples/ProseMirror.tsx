import { Editor, HtmlEditor, Toolbar } from "@aeaton/react-prosemirror";
import {
  plugins,
  schema,
  toolbar,
} from "@aeaton/react-prosemirror-config-default";
import { useState } from "react";

const initialValue = "<p></p>";

export const ProseMirrorEditor = () => {
  const [value, setValue] = useState(initialValue);

  return null;
  // return (
  //   <HtmlEditor
  //     schema={schema}
  //     plugins={plugins}
  //     value={initialValue}
  //     handleChange={setValue}
  //     debounce={250}
  //   >
  //     <Toolbar toolbar={toolbar} />
  //     <Editor autoFocus />
  //   </HtmlEditor>
  // )
};
