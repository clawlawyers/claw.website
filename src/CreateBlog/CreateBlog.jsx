import React, { useRef, useMemo, useState } from 'react'
import Styles from "./CreateBlog.module.css";
import { NODE_API_ENDPOINT } from '../utils/utils';
import {
    BlockNoteView, useCreateBlockNote, darkDefaultTheme,
    lightDefaultTheme
} from "@blocknote/react";
import "@blocknote/react/style.css";
import "@blocknote/core/fonts/inter.css";


export default function CreateBlog() {
    // const blockRef = useRef(null);
    const [blocks, setBlocks] = useState([]);
    const editor = useCreateBlockNote({ initialContent: [{}] }, []);

    const customDarkTheme = useMemo(() => ({
        ...darkDefaultTheme,
        colors: {
            ...darkDefaultTheme.colors,
            editor: {
                text: "white",
                background: "#13161f",
            }
        }
    }), []);

    const temp = useMemo(() => ({ dark: darkDefaultTheme, light: lightDefaultTheme }), []);
    console.log("rerender")
    return (
        <div className={Styles.main}>
            <BlockNoteView
                theme={temp}
                style={{ width: "100%", flex: 1 }}
                editor={editor}
                editable
                // onChange={() => blockRef.current = editor.document}
                onChange={() => {
                    setBlocks(editor.document)
                }}
            />
            <div className={'item bordered'}>
                <pre>
                    <code>{JSON.stringify(blocks, null, 2)}</code>
                </pre>
            </div>
            <button
                style={{ border: "none", padding: 12, borderRadius: 5, backgroundColor: "#8940FF", color: "white", fontSize: 18 }}
                // onClick={() => console.log(blockRef.current)}
                onClick={() => console.log(blocks)}
            >
                Publish Blog
            </button>
        </div>
    )
}
// function selectElementRender(element) {
//     switch (element.type) {
//         case "Heading":
//             return <h1 style={{ fontWeight: 600, fontSize: "65px" }}>
//                 {element.props.text}
//             </h1>
//         case "SubHeading":
//             return <h2 style={{
//                 fontSize: 25,
//                 color: "#777",
//                 lineHeight: 1
//             }}>{element.props.text}</h2>
//         case "Paragraph":
//             return <p style={{}}>{element.props.text}</p>
//         case "OrderedList":
//             return <ol style={{ marginTop: 20 }}>
//                 {element.props.items.map((item, itemIndex) => <li style={{ marginTop: 10 }} key={itemIndex}>{item}</li>)}
//             </ol>
//         case "UnorderedList":
//             return <ul style={{ marginTop: 20 }}>
//                 {element.props.items.map((item, itemIndex) => <li style={{ marginTop: 10 }} key={itemIndex}>{item}</li>)}
//             </ul>
//         case "Bold":
//             return <div style={{ marginTop: 20, fontWeight: 600 }}>
//                 {element.props.text}
//             </div>
//         default:
//             return <div> </div>
//     }
// }

// function ElementRenderer({ elementTree }) {

//     return (
//         <div style={{ width: "100%", color: "white", wordBreak: "break-word" }}>
//             {elementTree.map((element, index) => (
//                 <div key={index} style={{ fontSize: 20 }}>
//                     {selectElementRender(element)}
//                 </div>
//             ))}
//         </div>
//     )
// }


// function TextEditor({ onAddElement, elementType }) {
//     const [text, setText] = useState("");

//     function handleAddElement() {
//         if (text.trim() !== '') {
//             onAddElement({ type: elementType, props: { text } });
//             setText("");
//         }
//     }
//     return (
//         <div>
//             <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 20 }}>
//                 <textarea style={{ width: "80%" }} type="text" value={text} onChange={(e) => setText(e.target.value)} />
//                 <button style={{ backgroundColor: "#8940ff", color: "white", borderRadius: 5, padding: 10, border: "none", fontWeight: 600 }} onClick={handleAddElement}>Add {elementType}</button>
//             </div>
//             <div style={{ color: "white" }}>
//                 {selectElementRender({ type: elementType, props: { text } })}
//             </div>
//         </div>
//     )
// }

// function ListEditor({ onAddElement, isOrdered }) {
//     const [item, setItem] = useState("");
//     const [items, setItems] = useState([]);

//     function handleAddItem() {
//         if (item.trim() !== "") {
//             setItems([...items, item]);
//             setItem("");
//         }
//     };

//     function handleAddElement() {
//         if (items.length !== 0) {
//             onAddElement({
//                 type: isOrdered ? "OrderedList" : "UnorderedList",
//                 props: { items },
//             })
//             setItems([]);
//         }
//     };

//     return (
//         <div>
//             <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 20 }}>
//                 <textarea style={{ width: "80%" }} type='text' value={item} onChange={(e) => setItem(e.target.value)} />
//                 <div style={{ display: "flex", gap: 5 }}>
//                     <button style={{ backgroundColor: "#8940ff", color: "white", borderRadius: 5, padding: 10, fontWeight: 600, border: "none" }} onClick={handleAddItem}>
//                         add list item
//                     </button>
//                     <button style={{ backgroundColor: "#8940ff", color: "white", borderRadius: 5, padding: 10, fontWeight: 600, border: "none" }} onClick={handleAddElement}>
//                         add list
//                     </button>

//                 </div>
//             </div>
//             <div style={{ color: "white" }}>
//                 {selectElementRender({ type: isOrdered ? "OrderedList" : "UnorderedList", props: { items } })}
//             </div>
//         </div>
//     )
// };


// function ElementEditor({ onAddElement, elementSelect }) {
//     function selectElementEditor() {
//         switch (elementSelect) {
//             case "Heading":
//                 return <TextEditor onAddElement={onAddElement} elementType={"Heading"} />
//             case "SubHeading":
//                 return <TextEditor onAddElement={onAddElement} elementType={"SubHeading"} />
//             case "Paragraph":
//                 return <TextEditor onAddElement={onAddElement} elementType={"Paragraph"} />
//             case "Bold":
//                 return <TextEditor onAddElement={onAddElement} elementType={"Bold"} />
//             case "OrderedList":
//                 return <ListEditor onAddElement={onAddElement} isOrdered={true} />
//             case "UnorderedList":
//                 return <ListEditor onAddElement={onAddElement} isOrdered={false} />
//             default:
//                 return <div> </div>
//         }
//     }
//     return (
//         <div style={{ width: "100%" }}>
//             {selectElementEditor()}
//         </div>
//     )
// }
