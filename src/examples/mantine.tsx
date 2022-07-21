import { useEffect } from "react";
import { MantineEditor, useLoopEditor } from "../MantineEditor";

export const Editor = () => {
  const loopEditor = useLoopEditor();

  useEffect(() => {
    loopEditor.editor?.editor?.on("editor-change", handleEditorChange);

    return () => {
      loopEditor.editor?.editor?.off("editor-change", handleEditorChange);
    };
  }, []);

  const handleEditorChange = (...args: any[]) => console.log(args);

  return (
    <div className="App">
      <MantineEditor style={{ width: "30rem" }} editor={loopEditor} />
    </div>
  );
};
