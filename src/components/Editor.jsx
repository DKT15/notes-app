import React from "react";
import Showdown from "showdown";
import ReactMde from "react-mde";
import "react-mde/lib/styles/css/react-mde-all.css";

function Editor({ currentNote, updateNote }) {
  const [selectedTab, setSelectedTab] = React.useState("write"); // It is maintaining its own state and controls the tabs. The default is set to write. It allows you to toggle between write and preview.

  // This is what converts markdown code to HTML code.
  const converter = new Showdown.Converter({
    tables: true,
    simplifiedAutoLink: true,
    strikethrough: true,
    tasklists: true,
  });

  // selectedTab and onTabChange is something that is built into Reactmde.
  // This is where the change of tab to preview will covert markdown into HTMl code which will display in a much cleaner format.
  return (
    <section className="pane editor">
      <ReactMde
        value={currentNote?.body} //optional chaining in case current note does not exist.
        onChange={updateNote}
        selectedTab={selectedTab}
        onTabChange={setSelectedTab}
        generateMarkdownPreview={(markdown) =>
          Promise.resolve(converter.makeHtml(markdown))
        }
        minEditorHeight={80}
        heightUnits="vh"
      />
    </section>
  );
}

export default Editor;
