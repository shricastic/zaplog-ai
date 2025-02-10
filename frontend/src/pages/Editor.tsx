import { useEffect, useRef } from "react";
import EditorJS, { OutputData,  } from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import ImageTool from "@editorjs/image";
import { Input } from "@/components/ui/input";
// import Embed from "@editorjs/embed";

interface EditorProps {
  onChange: (data: OutputData) => void;
  data?: OutputData;
}

const DEFAULT_INITIAL_DATA: OutputData = {
  time: new Date().getTime(),
  blocks: [

    {
      type: "header",
      data: {
        text: "Title",
        level: 2,
      },
    },
  ],
};

const Editor: React.FC<EditorProps> = ({ onChange, data }) => {
  const editorRef = useRef<EditorJS | null>(null);

  useEffect(() => {
    if (!editorRef.current) {
      const editor = new EditorJS({
        // readOnly : true,
        holder: "editorjs",
        tools: {
          header: {
            class: Header,
            config: {
              placeholder: "Enter a heading",
              levels: [1, 2, 3, 4, 5, 6],
              defaultLevel: 2,
              inlineToolbar: true,
            },
          } ,
          list: List,
          image: {
            class: ImageTool,

            config: {

              uploader: {
                async uploadByFile(file: File) {
                  return new Promise((resolve) => {
                    setTimeout(() => {
                      resolve({
                        success: 1,
                        file: {
                          url: URL.createObjectURL(file),
                        },
                      });
                    }, 1000);
                  });
                },
              },
            },
          },
        },
        data: data || DEFAULT_INITIAL_DATA,
        async onChange(api) {
          const content = await api.saver.save();
          // const validContent = {
          //   ...content,
          //   blocks: content.blocks.filter((block) => {
          //     if (block.type === "header") {
          //       return block.data.text && block.data.level;
          //     }
          //     return true;
          //   }),
          // };
          onChange(content);
        },
      });

      editorRef.current = editor;
    }

    return () => {
      if (editorRef.current) {
        editorRef.current.destroy();
        editorRef.current = null;
      }
    };
  }, []);

  return <div id="editorjs" className=" border p-4 rounded-md">

  </div>;
};

export default Editor;