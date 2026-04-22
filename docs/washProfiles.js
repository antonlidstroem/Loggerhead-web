// js/washProfiles.js

export const washProfiles = {
    default: {
        name: "Default",
        rules: [
            {
                type: "replace",
                pattern: /https?:\/\/\S+/g,
                replacement: "[URL]"
            },
            {
                type: "replace",
                pattern: /BardChatUi\.[a-zA-Z0-9.-]+/g,
                replacement: "BardChatUi.[ID]"
            }
        ]
    },

    privacy: {
        name: "Privacy",
        rules: [
            {
                type: "replace",
                pattern: /https?:\/\/\S+/g,
                replacement: "[URL]"
            },
            {
                type: "replace",
                pattern: /\b[\w.-]+@[\w.-]+\.\w+\b/g,
                replacement: "[EMAIL]"
            },
            {
                type: "replace",
                pattern: /Bearer\s+[A-Za-z0-9\-._~+/]+=*/g,
                replacement: "[TOKEN]"
            }
        ]
    }
};
