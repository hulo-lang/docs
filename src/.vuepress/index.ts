import type { ShikiPluginOptions } from "@vuepress/plugin-shiki";
import huloGrammar from "./hulo.tmLanguage.json" with { type: "json" };

const hulotmLanguage = {
    id: "hulo", 
    ...huloGrammar,
};

export default <ShikiPluginOptions>{
    themes: {
        light: "one-light",
        dark: "one-dark-pro",
    },
    lineNumbers: true,

    langs: [hulotmLanguage],
};
