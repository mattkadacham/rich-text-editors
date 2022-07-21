import "./App.css";
import React, { Component, useCallback, useEffect } from "react";
// import { MentionFeedItem } from "@ckeditor/ckeditor5-mention/src/mention";
import Mention, {
  MentionFeedItem,
} from "@ckeditor/ckeditor5-mention/src/mention";
import { MantineEditor, useLoopEditor } from "./MantineEditor";
import { EditorChangeHandler } from "quill";
import TiptapEditor from "./examples/tiptap";
import RemirrorEditor from "./examples/remirror";

function App() {
  return (
    <div className="App">
      <TiptapEditor />
      {/* <RemirrorEditor /> */}
    </div>
  );
}

export default App;
