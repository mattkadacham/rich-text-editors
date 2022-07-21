// import Editor from "ckeditor";
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { EditorConfig } from "@ckeditor/ckeditor5-core/src/editor/editorconfig";
import EventInfo from "@ckeditor/ckeditor5-utils/src/eventinfo";
import { FC, useCallback, useEffect, useRef, useState } from "react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

type LoopEditor = {
  refFunction: (node: HTMLDivElement) => void;
  initialised: boolean;
  ckEditor: ClassicEditor | undefined;
  // ckEditor: ClassicEditor | undefined;
  content: string;
  editorContainer: HTMLDivElement | undefined;
};

const useLoopEditor = (config?: EditorConfig): LoopEditor => {
  const [initialised, setInitialised] = useState<boolean>(false);
  const ckEditor = useRef<ClassicEditor>();
  const [content, setContent] = useState<string>("");
  const [editorContainer, setEditorContainer] = useState<HTMLDivElement>();

  const createEditor = (root: HTMLDivElement): (() => void) => {
    console.log("initialising editor");
    if (ckEditor.current) {
      console.log("editor found");
    } else {
      console.log("creating editor");
      ClassicEditor.create(root, config).then((_editor) => {
        _editor.model.document.on("change:data", onChange);
        ckEditor.current = _editor;
      });
    }
    setInitialised(true);

    return () => {
      if (!ckEditor.current) return;
      console.log("destroying");
      ckEditor.current.model.document.off("change:data", onChange);
      ckEditor.current.destroy();
      ckEditor.current = undefined;
      setInitialised(false);
      setContent("");
      setEditorContainer(undefined);
    };
  };

  const onChange = useCallback((event: EventInfo) => {
    ckEditor.current && setContent(ckEditor.current.getData());
    console.log("change", ckEditor.current?.getData());
  }, []);

  useEffect(() => {
    if (!editorContainer) return;
    const destroy = createEditor(editorContainer);
    return destroy;
  }, [editorContainer]);

  const refFunction = (node: HTMLDivElement) => {
    setEditorContainer(node);
  };

  return {
    refFunction,
    initialised,
    ckEditor: ckEditor.current,
    content,
    editorContainer,
  };
};

const CKEditor: FC<{ editor: LoopEditor }> = ({ editor }) => {
  return <div ref={editor.refFunction} id="editor" />;
};

export { useLoopEditor, CKEditor };
