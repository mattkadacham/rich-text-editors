import {
  CSSProperties,
  FC,
  MutableRefObject,
  Ref,
  SetStateAction,
  useMemo,
  useRef,
  useState,
} from "react";
import { Editor, RichTextEditor } from "@mantine/rte";

const initialValue =
  "<p>Your initial <b>html value</b> or an empty string to init editor without value</p>";

export type LoopEditor = {
  value: string;
  setValue: (value: string) => void;
  container: HTMLDivElement | undefined;
  containerRef: (node: HTMLDivElement) => void;
  editorRef: (node: Editor) => void;
  editor: Editor | undefined;
  // editorRef: MutableRefObject<Editor | undefined>;
};

export const useLoopEditor = (): LoopEditor => {
  const [value, setValue] = useState(initialValue);
  const editorRef = useRef<Editor>();
  const [container, setContainer] = useState<HTMLDivElement>();
  const [editor, setEditor] = useState<Editor>();

  return {
    value,
    setValue: (value: string) => setValue(value),
    container,
    containerRef: (node: HTMLDivElement) => setContainer(node),
    editorRef: (node: Editor) => setEditor(node),
    editor,
  };
};

type MatchItem = {
  id: number;
  value: string;
};

const people = [
  { id: 1, value: "Bill Horsefighter" },
  { id: 2, value: "Amanda Hijacker" },
  { id: 3, value: "Leo Summerhalter" },
  { id: 4, value: "Jane Sinkspitter" },
];

const tags = [
  { id: 1, value: "JavaScript" },
  { id: 2, value: "TypeScript" },
  { id: 3, value: "Ruby" },
  { id: 3, value: "Python" },
];

export const MantineEditor: FC<{
  editor: LoopEditor;
  style?: CSSProperties;
}> = ({ editor, style }) => {
  const mentions = useMemo(
    () => ({
      allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,
      mentionDenotationChars: ["@", "#"],
      source: (
        searchTerm: string,
        renderList: (matches: MatchItem[], searchTerm: string) => void,
        mentionChar: string
      ) => {
        const list = mentionChar === "@" ? people : tags;
        const includesSearchTerm = list.filter((item) =>
          item.value.toLowerCase().includes(searchTerm.toLowerCase())
        );
        renderList(includesSearchTerm, searchTerm);
      },
    }),
    []
  );

  return (
    <div style={{ ...(style || {}) }} ref={editor.containerRef}>
      <RichTextEditor
        ref={editor.editorRef as Ref<Editor>}
        value={editor.value}
        onChange={(value) => editor.setValue(value)}
        mentions={mentions}
      />
    </div>
  );
};
