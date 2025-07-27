import type { ShikiPluginOptions } from "@vuepress/plugin-shiki";
import huloGrammar from "./hulo.tmLanguage.json" with { type: "json" };
import amberGrammar from './amber.tmLanguage.json' with {type: "json"};
import antlrGrammar from './antlr.tmLanguage.json' with {type: "json"};

const hulotmLanguage = {
    id: "hulo",
    ...huloGrammar,
};

const ambertmLanguage = {
    id: "amber",
    ...amberGrammar,
}

const antlrLanguage = {
    id: "antlr",
    ...antlrGrammar,
}

export default <ShikiPluginOptions>{
    themes: {
        light: "one-light",
        dark: "one-dark-pro",
    },
    lineNumbers: false,
    langs: [hulotmLanguage, ambertmLanguage, antlrLanguage],
};
