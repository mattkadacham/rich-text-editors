import { useEditor, EditorContent, ReactRenderer, Node } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Mention from "@tiptap/extension-mention";
import type { SuggestionOptions } from "@tiptap/suggestion";
import "./tiptap.css";
import { FC, useState } from "react";

const MentionList: FC<{ items: string[] }> = ({ items }) => {
  return (
    <>
      {items.map((i) => (
        <div>{i}</div>
      ))}
    </>
  );
};

const useMentionNode = (): { node: Node; items: string[] } => {
  const [suggestionItems, setSuggestionItems] = useState<string[]>([]);

  const suggestions: Omit<SuggestionOptions, "editor"> = {
    items: ({ query }) =>
      ["aaa", "bbb", "ccc", "abab", "cbcbc", "aabbccc"].filter((i) =>
        i.includes(query)
      ),
    char: "@",
    render: () => ({
      onStart: (props) => {
        console.log("suggestion onStart", props);
        // setSuggestionItems(props.items)
      },
      onUpdate: (props) => {
        console.log("suggestion onUpdate", props);
        setSuggestionItems(props.items);
      },
      onExit(props) {
        console.log("suggestion onExit", props);
        setSuggestionItems([]);
      },
    }),
    decorationClass: "aaa",
    decorationTag: "span",
    allowSpaces: false,
  };

  const node = Mention.configure({
    HTMLAttributes: {
      class: "mention",
    },
    suggestion: suggestions,
    renderLabel: (props) => {
      console.log("renderlabel", props);
      return "aaa";
    },
  });

  return {
    node,
    items: suggestionItems,
  };
};

const TiptapEditor = () => {
  const mentions = useMentionNode();

  const editor = useEditor({
    extensions: [StarterKit, mentions.node],
    content: "<p>Hello World!</p>",
    // onUpdate: (props) => {
    //   console.log("update", props.transaction.doc.content.toJSON());
    // },
  });

  return (
    <div>
      <EditorContent editor={editor} />
      <ul>
        {mentions.items.map((i) => (
          <li>{i}</li>
        ))}
      </ul>
    </div>
  );
};

export default TiptapEditor;
