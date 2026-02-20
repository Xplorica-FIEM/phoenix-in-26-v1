"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface RichTextNode {
    type: string;
    content?: RichTextNode[];
    text?: string;
    attrs?: {
        level?: number;
        textAlign?: string;
        href?: string;
        fontSize?: string;
    };
    marks?: {
        type: string;
        attrs?: {
            href?: string;
            fontSize?: string;
        };
    }[];
}

interface RichTextContent {
    type?: string;
    content: RichTextNode[];
}

interface RichTextRendererProps {
    content: RichTextContent | null;
    className?: string;
}

/**
 * Renders TipTap JSON content to React components
 * This allows full customization of how content is displayed
 */
export function RichTextRenderer({ content, className }: RichTextRendererProps) {
    if (!content || !content.content) {
        return null;
    }

    return (
        <div className={cn("rich-text-content", className)}>
            {content.content.map((node, index) => (
                <RenderNode key={index} node={node} />
            ))}
        </div>
    );
}

// Render individual nodes
function RenderNode({ node }: { node: RichTextNode }) {
    if (!node) return null;

    switch (node.type) {
        case "paragraph": {
            const alignClass = node.attrs?.textAlign ? `text-${node.attrs.textAlign}` : "";
            return (
                <p className={cn("mb-4 leading-relaxed", alignClass)}>
                    {node.content?.map((child, i) => (
                        <RenderInline key={i} node={child} />
                    ))}
                </p>
            );
        }

        case "heading": {
            const level = (node.attrs?.level || 1) as 1 | 2 | 3 | 4 | 5 | 6;
            const HeadingTag = `h${level}` as keyof React.JSX.IntrinsicElements;
            const headingClasses: Record<number, string> = {
                1: "text-3xl font-bold mb-4 mt-6",
                2: "text-2xl font-semibold mb-3 mt-5",
                3: "text-xl font-medium mb-2 mt-4",
                4: "text-lg font-medium mb-2 mt-3",
                5: "text-base font-medium mb-1 mt-2",
                6: "text-sm font-medium mb-1 mt-2 uppercase tracking-wide",
            };
            const alignClass = node.attrs?.textAlign ? `text-${node.attrs.textAlign}` : "";
            return (
                <HeadingTag className={cn(headingClasses[level] || headingClasses[1], alignClass)}>
                    {node.content?.map((child, i) => (
                        <RenderInline key={i} node={child} />
                    ))}
                </HeadingTag>
            );
        }

        case "bulletList":
            return (
                <ul className="list-disc pl-6 mb-4 space-y-1">
                    {node.content?.map((item, i) => (
                        <RenderNode key={i} node={item} />
                    ))}
                </ul>
            );

        case "orderedList":
            return (
                <ol className="list-decimal pl-6 mb-4 space-y-1">
                    {node.content?.map((item, i) => (
                        <RenderNode key={i} node={item} />
                    ))}
                </ol>
            );

        case "listItem":
            return (
                <li>
                    {node.content?.map((child, i) => {
                        // List items contain paragraphs or nested lists
                        if (child.type === "paragraph") {
                            return child.content?.map((inline, j) => (
                                <RenderInline key={j} node={inline} />
                            ));
                        }
                        return <RenderNode key={i} node={child} />;
                    })}
                </li>
            );

        case "blockquote":
            return (
                <blockquote className="border-l-4 border-yellow-400 pl-4 italic mb-4">
                    {node.content?.map((child, i) => (
                        <RenderNode key={i} node={child} />
                    ))}
                </blockquote>
            );

        case "codeBlock":
            return (
                <pre className="bg-slate-100 rounded-md p-4 mb-4 overflow-x-auto text-slate-800">
                    <code>
                        {node.content?.map((child, i) => (
                            <RenderInline key={i} node={child} />
                        ))}
                    </code>
                </pre>
            );

        case "horizontalRule":
            return <hr className="my-6 border-slate-200" />;

        default:
            // Handle unknown block types gracefully
            if (node.content) {
                return (
                    <>
                        {node.content.map((child, i) => (
                            <RenderNode key={i} node={child} />
                        ))}
                    </>
                );
            }
            return null;
    }
}

// Render inline content (text with marks)
function RenderInline({ node }: { node: RichTextNode }) {
    if (!node) return null;

    if (node.type === "text") {
        let content: React.ReactNode = node.text;

        // Apply marks (formatting)
        if (node.marks) {
            node.marks.forEach((mark, index) => {
                switch (mark.type) {
                    case "bold":
                        content = <strong key={`bold-${index}`}>{content}</strong>;
                        break;
                    case "italic":
                        content = <em key={`italic-${index}`}>{content}</em>;
                        break;
                    case "underline":
                        content = <u key={`underline-${index}`}>{content}</u>;
                        break;
                    case "link":
                        content = (
                            <a
                                key={`link-${index}`}
                                href={mark.attrs?.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 underline hover:text-blue-800"
                            >
                                {content}
                            </a>
                        );
                        break;
                    case "code":
                        content = (
                            <code key={`code-${index}`} className="bg-slate-100 px-1.5 py-0.5 rounded text-sm text-red-500">
                                {content}
                            </code>
                        );
                        break;
                    case "highlight":
                        content = (
                            <mark key={`highlight-${index}`} className="bg-yellow-200 px-0.5 rounded-sm">
                                {content}
                            </mark>
                        );
                        break;
                    case "textStyle":
                        // Handle fontSize from textStyle mark
                        if (mark.attrs?.fontSize) {
                            content = (
                                <span key={`textStyle-${index}`} style={{ fontSize: mark.attrs.fontSize }}>
                                    {content}
                                </span>
                            );
                        }
                        break;
                    default:
                        break;
                }
            });
        }

        return content;
    }

    // Handle hard breaks
    if (node.type === "hardBreak") {
        return <br />;
    }

    return null;
}

export default RichTextRenderer;
