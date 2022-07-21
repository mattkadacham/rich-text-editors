import {
  OnChangeJSON,
  useMention,
  useRemirror,
  Remirror,
} from "@remirror/react";
import { WysiwygEditor } from "@remirror/react-editors/wysiwyg";
import { MentionExtension } from "remirror/extensions";
import { RemirrorJSON } from "remirror";
import { Mention } from "@ckeditor/ckeditor5-mention";
import { FC } from "react";
import { extensions } from "@tiptap/core";

// const { manager } = useRemirror({
//   extensions: () => [new MentionExtension()]
// })

const data = [
  {
    id: "1",
    label: "one",
  },
  {
    id: "2",
    label: "two",
  },
  {
    id: "3",
    label: "three",
  },
];

const App: React.FC = () => {
  const handleChange = (json: RemirrorJSON) => {
    console.log("change", json);
  };

  const { manager } = useRemirror({});

  // console.log(m.getItemProps())

  return (
    <div style={{ padding: 16 }}>
      <Remirror manager={manager}>
        <MentionComponent />
        {/* <WysiwygEditor placeholder="Enter text...">
          <OnChangeJSON onChange={handleChange} />
        </WysiwygEditor> */}
      </Remirror>
    </div>
  );
};

const MentionComponent: FC = () => {
  const m = useMention({ items: data });
  console.log(m.getMenuProps());
  console.log(m);

  return <div />;
};

export default App;
