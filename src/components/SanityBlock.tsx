import {PortableTextReactComponents} from "@portabletext/react";

export const BlockComponents: Partial<PortableTextReactComponents> = {
    listItem: {
        bullet: ({ children }) => <li key="bullet" className={"list-disc list-inside"}>{children}</li>,
    }
}