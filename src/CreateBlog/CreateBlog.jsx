import React, { useState } from 'react'
import Header from '../Header/Header'
import FooterBanner from '../FooterBanner/FooterBanner';
import Styles from "./CreateBlog.module.css";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { NODE_API_ENDPOINT } from '../utils/utils';

export default function CreateBlog() {
    const [elementTree, setElementTree] = useState([]);
    const [elementType, setElementType] = useState("Heading");
    const [isLoading, setIsLoading] = useState(false);

    function onAddElement(element) {
        setElementTree([...elementTree, element]);
    };

    async function handleBlogSubmission() {
        const blogHeading = elementTree.find((element) => element.type === "Heading");
        const blogSubHeading = elementTree.find((element) => element.type === "SubHeading");
        setIsLoading(true);
        const reqBody = {
            heading: blogHeading?.props?.text || "",
            subHeading: blogSubHeading?.props?.text || "",
            content: elementTree
        }
        console.log(JSON.stringify(reqBody))
        try {
            const res = await fetch(`${NODE_API_ENDPOINT}/blog/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(reqBody),
            });
            const parsed = await res.json();
            console.log(parsed);
        } catch (error) {
            console.log(error)
        }

        setElementTree([]);
        setIsLoading(false);
    }
    return (
        <div>
            <div className={Styles.main} >
                <Select
                    value={elementType}
                    onChange={(e) => setElementType(e.target.value)}
                    label="Element Type"
                    style={{ backgroundColor: "white" }}

                >
                    <MenuItem value={"Heading"}>Heading</MenuItem>
                    <MenuItem value={"SubHeading"}>SubHeading</MenuItem>
                    <MenuItem value={"Paragraph"}>Paragraph</MenuItem>
                    <MenuItem value={"Bold"}>Bold</MenuItem>
                    <MenuItem value={"OrderedList"}>Ordered List</MenuItem>
                    <MenuItem value={"UnorderedList"}>Unordered List</MenuItem>
                </Select>

                <h1 style={{ color: "white", fontWeight: 600, borderBottom: "1px solid white", width: "100%", padding: "20px 0px" }}>Component Preview</h1>
                <ElementEditor onAddElement={onAddElement} elementSelect={elementType} />
                <h1 style={{ color: "white", fontWeight: 600, borderBottom: "1px solid white", width: "100%", padding: "20px 0px" }}>Blog Preview</h1>
                <ElementRenderer elementTree={elementTree} />
                <button
                    style={{ backgroundColor: "#8940ff", color: "white", borderRadius: 5, padding: 10, border: "none", fontWeight: 600 }}
                    onClick={handleBlogSubmission}
                    disabled={isLoading}
                >
                    Save Blog
                </button>
            </div>
        </div>
    )
}
function selectElementRender(element) {
    switch (element.type) {
        case "Heading":
            return <h1 style={{ fontWeight: 600, fontSize: "65px" }}>
                {element.props.text}
            </h1>
        case "SubHeading":
            return <h2 style={{
                fontSize: 25,
                color: "#777",
                lineHeight: 1
            }}>{element.props.text}</h2>
        case "Paragraph":
            return <p style={{}}>{element.props.text}</p>
        case "OrderedList":
            return <ol style={{ marginTop: 20 }}>
                {element.props.items.map((item, itemIndex) => <li style={{ marginTop: 10 }} key={itemIndex}>{item}</li>)}
            </ol>
        case "UnorderedList":
            return <ul style={{ marginTop: 20 }}>
                {element.props.items.map((item, itemIndex) => <li style={{ marginTop: 10 }} key={itemIndex}>{item}</li>)}
            </ul>
        case "Bold":
            return <div style={{ marginTop: 20, fontWeight: 600 }}>
                {element.props.text}
            </div>
        default:
            return <div> </div>
    }
}

function ElementRenderer({ elementTree }) {

    return (
        <div style={{ width: "100%", color: "white", wordBreak: "break-word" }}>
            {elementTree.map((element, index) => (
                <div key={index} style={{ fontSize: 20 }}>
                    {selectElementRender(element)}
                </div>
            ))}
        </div>
    )
}


function TextEditor({ onAddElement, elementType }) {
    const [text, setText] = useState("");

    function handleAddElement() {
        if (text.trim() !== '') {
            onAddElement({ type: elementType, props: { text } });
            setText("");
        }
    }
    return (
        <div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 20 }}>
                <textarea style={{ width: "80%" }} type="text" value={text} onChange={(e) => setText(e.target.value)} />
                <button style={{ backgroundColor: "#8940ff", color: "white", borderRadius: 5, padding: 10, border: "none", fontWeight: 600 }} onClick={handleAddElement}>Add {elementType}</button>
            </div>
            <div style={{ color: "white" }}>
                {selectElementRender({ type: elementType, props: { text } })}
            </div>
        </div>
    )
}

function ListEditor({ onAddElement, isOrdered }) {
    const [item, setItem] = useState("");
    const [items, setItems] = useState([]);

    function handleAddItem() {
        if (item.trim() !== "") {
            setItems([...items, item]);
            setItem("");
        }
    };

    function handleAddElement() {
        if (items.length !== 0) {
            onAddElement({
                type: isOrdered ? "OrderedList" : "UnorderedList",
                props: { items },
            })
            setItems([]);
        }
    };

    return (
        <div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 20 }}>
                <textarea style={{ width: "80%" }} type='text' value={item} onChange={(e) => setItem(e.target.value)} />
                <div style={{ display: "flex", gap: 5 }}>
                    <button style={{ backgroundColor: "#8940ff", color: "white", borderRadius: 5, padding: 10, fontWeight: 600, border: "none" }} onClick={handleAddItem}>
                        add list item
                    </button>
                    <button style={{ backgroundColor: "#8940ff", color: "white", borderRadius: 5, padding: 10, fontWeight: 600, border: "none" }} onClick={handleAddElement}>
                        add list
                    </button>

                </div>
            </div>
            <div style={{ color: "white" }}>
                {selectElementRender({ type: isOrdered ? "OrderedList" : "UnorderedList", props: { items } })}
            </div>
        </div>
    )
};


function ElementEditor({ onAddElement, elementSelect }) {
    function selectElementEditor() {
        switch (elementSelect) {
            case "Heading":
                return <TextEditor onAddElement={onAddElement} elementType={"Heading"} />
            case "SubHeading":
                return <TextEditor onAddElement={onAddElement} elementType={"SubHeading"} />
            case "Paragraph":
                return <TextEditor onAddElement={onAddElement} elementType={"Paragraph"} />
            case "Bold":
                return <TextEditor onAddElement={onAddElement} elementType={"Bold"} />
            case "OrderedList":
                return <ListEditor onAddElement={onAddElement} isOrdered={true} />
            case "UnorderedList":
                return <ListEditor onAddElement={onAddElement} isOrdered={false} />
            default:
                return <div> </div>
        }
    }
    return (
        <div style={{ width: "100%" }}>
            {selectElementEditor()}
        </div>
    )
}
