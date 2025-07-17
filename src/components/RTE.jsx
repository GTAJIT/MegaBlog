import React, { useMemo } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";
import conf from "../conf/conf";

export default function RTE({ name = "content", control, defaultValue = "" }) {
  // Memoize TinyMCE init config
  const editorInit = useMemo(() => ({
    height: 500,
    menubar: true,
    plugins: [
      "advlist", "autolink", "lists", "link", "image", "charmap",
      "preview", "anchor", "searchreplace", "visualblocks", "code",
      "fullscreen", "insertdatetime", "media", "table", "help", "wordcount"
    ],
    toolbar:
      "undo redo | blocks | bold italic forecolor | " +
      "alignleft aligncenter alignright alignjustify | " +
      "bullist numlist outdent indent | removeformat | help | image",
    content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
  }), []);

  return (
    <div className="w-full">
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        // eslint-disable-next-line no-unused-vars
        render={({ field: { onChange, value } }) => (
          <Editor
            id={name}
            apiKey={conf.TineyMCEAPI}
            initialValue={defaultValue}
            init={editorInit}
            onEditorChange={onChange}
          />
        )}
      />
    </div>
  );
}
