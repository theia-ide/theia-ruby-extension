/********************************************************************************
 * Copyright (C) 2018 TypeFox and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License v. 2.0 which is available at
 * http://www.eclipse.org/legal/epl-2.0.
 *
 * This Source Code may also be made available under the following Secondary
 * Licenses when the conditions for such availability set forth in the Eclipse
 * Public License v. 2.0 are satisfied: GNU General Public License, version 2
 * with the GNU Classpath Exception which is available at
 * https://www.gnu.org/software/classpath/license.html.
 *
 * SPDX-License-Identifier: EPL-2.0 OR GPL-2.0 WITH Classpath-exception-2.0
 ********************************************************************************/

import { LanguageGrammarDefinitionContribution, TextmateRegistry } from "@theia/monaco/lib/browser/textmate";
import { injectable } from "inversify";
import { RUBY_LANGUAGE_ID } from "../common";

@injectable()
export class RubyGrammarContribution implements LanguageGrammarDefinitionContribution {

    readonly config: monaco.languages.LanguageConfiguration = {
        comments: {
            lineComment: "#",
            blockComment: ["=begin", "=end"]
        },
        brackets: [
            ["{", "}"],
            ["[", "]"],
            ["(", ")"]
        ],
        autoClosingPairs: [
            { open: "{", close: "}" },
            { open: "[", close: "]" },
            { open: "(", close: ")" },
            { open: "\"", close: "\"" },
            { open: "'", close: "'" }
        ],
        surroundingPairs: [
            { open: "{", close: "}" },
            { open: "[", close: "]" },
            { open: "(", close: ")" },
            { open: "\"", close: "\"" },
            { open: "'", close: "'" }
        ],
        indentationRules: {
            increaseIndentPattern: new RegExp("^\\s*((begin|class|(private|protected)\\s+def|def|else|elsif|ensure|for|if|module|rescue|unless|until|when|while|case)|([^#]*\\sdo\\b)|([^#]*=\\s*(case|if|unless)))\\b([^#\\{;]|(\"|'|\/).*\\4)*(#.*)?$"),
            decreaseIndentPattern: new RegExp("^\\s*([}\\]]([,)]?\\s*(#|$)|\\.[a-zA-Z_]\\w*\\b)|(end|rescue|ensure|else|elsif|when)\\b)")
        }
    };

    registerTextmateLanguage(registry: TextmateRegistry) {
        monaco.languages.register({
            id: RUBY_LANGUAGE_ID,
            "extensions": [
                ".rb",
                ".rbx",
                ".rjs",
                ".gemspec",
                ".rake",
                ".ru",
                ".erb"
            ],
            "aliases": [
                "Ruby",
                "rb"
            ],
            "firstLine": "^#!\\s*/.*\\bruby\\b"
        });

        monaco.languages.setLanguageConfiguration(RUBY_LANGUAGE_ID, this.config);

        const rubyGrammar = require('../../data/ruby.tmLanguage.json');
        registry.registerTextmateGrammarScope('source.ruby', {
            async getGrammarDefinition() {
                return {
                    format: 'json',
                    content: rubyGrammar
                };
            }
        });

        registry.mapLanguageIdToTextmateGrammar(RUBY_LANGUAGE_ID, 'source.ruby');
    }
}