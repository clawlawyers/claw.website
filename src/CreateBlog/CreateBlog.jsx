import React, { useState } from "react";
import Styles from "./CreateBlog.module.css";
import { NODE_API_ENDPOINT } from "../utils/utils";
import toast from "react-hot-toast";
import {
  BlockNoteView,
  useCreateBlockNote,
  darkDefaultTheme,
} from "@blocknote/react";
import "@blocknote/react/style.css";
import "@blocknote/core/fonts/inter.css";
import CircularProgress from "@mui/material/CircularProgress";
import { Helmet } from "react-helmet";

const customDarkTheme = {
  ...darkDefaultTheme,
  colors: {
    ...darkDefaultTheme.colors,
    editor: {
      text: "white",
      background: "#13161f",
    },
  },
};

const customTheme = { dark: customDarkTheme, light: customDarkTheme };

export default function CreateBlog() {
  const [avatarImageUrl, setAvatarImageUrl] = useState("");
  const [content, setContent] = useState([{}]);
  const [heading, setHeading] = useState("");
  const [subHeading, setSubHeading] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const editor = useCreateBlockNote({ initialContent: [{}] }, []);
  const [html, setHtml] = useState("");
  async function onPublish(e) {
    e.preventDefault();
    try {
      if (!heading || !subHeading) return;
      setIsLoading(true);
      await fetch(`${NODE_API_ENDPOINT}/blog/publish`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          heading,
          content,
          subHeading,
          html,
          mainImg: avatarImageUrl,
        }),
      });
      toast.success("Blog Published");
      setHeading("");
      setSubHeading("");
      setHtml("");
    } catch (error) {
      console.log(error);
      toast.error("Failed to Publish Blog");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={Styles.main}>
      <Helmet>
        <title>Share Your Legal Expertise</title>
        <meta
          name="description"
          content="Become a thought leader in the legal industry. Share your insights and commentary with our audience by publishing a blog post on Claw."
        />
        {/* <meta
          name="keywords"
          content=""
        /> */}
      </Helmet>
      <BlockNoteView
        theme={customTheme}
        style={{ width: "100%", flex: 1 }}
        editor={editor}
        editable
        onChange={async () => {
          const p = await editor.blocksToHTMLLossy(editor.document);
          setHtml(p);
          setContent(editor.document);
        }}
      />
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 4,
          width: "100%",
        }}
        onSubmit={onPublish}
      >
        <label>Published Heading</label>
        <input
          style={{
            width: "80%",
            background: "#32353c",
            color: "white",
            padding: 10,
            fontSize: 15,
            borderRadius: 2,
            outline: "none",
            border: "none",
          }}
          onChange={(e) => setHeading(e.target.value)}
          value={heading}
          minLength={2}
          type="text"
        />
        <label>Published subHeading</label>
        <input
          style={{
            width: "80%",
            background: "#32353c",
            color: "white",
            padding: 10,
            fontSize: 15,
            borderRadius: 2,
            outline: "none",
            border: "none",
          }}
          onChange={(e) => setSubHeading(e.target.value)}
          value={subHeading}
          minLength={2}
          type="text"
        />
        <label>Image Url</label>
        <input
          style={{
            width: "80%",
            background: "#32353c",
            color: "white",
            padding: 10,
            fontSize: 15,
            borderRadius: 2,
            outline: "none",
            border: "none",
          }}
          onChange={(e) => setAvatarImageUrl(e.target.value)}
          value={avatarImageUrl}
          minLength={2}
          type="text"
        />
        {avatarImageUrl !== "" && (
          <div>
            <label>Image Preview</label>
            <img src={avatarImageUrl} />
          </div>
        )}
        <button
          type="submit"
          style={{
            alignSelf: "flex-start",
            border: "none",
            padding: 12,
            marginTop: 10,
            borderRadius: 5,
            backgroundColor: "#008080",
            color: "white",
            fontSize: 18,
          }}
          disabled={isLoading}
        >
          {isLoading ? (
            <CircularProgress style={{ color: "white", fontSize: 18 }} />
          ) : (
            <>Publish Blog</>
          )}
        </button>
      </form>
    </div>
  );
}
