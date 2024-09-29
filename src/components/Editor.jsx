import React from "react";
import Showdown from "showdown";
import ReactMde from "react-mde";
import "react-mde/lib/styles/css/react-mde-all.css";
import "../styles/App.css";

function Editor({ tempNoteText, setTempNoteText }) {
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
        value={tempNoteText}
        onChange={setTempNoteText}
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
