/*
 * Copyright (C) 2018 TypeFox and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import { RubyClientContribution } from './ruby-contribution';
import { LanguageClientContribution } from "@theia/languages/lib/browser";
import { ContainerModule } from "inversify";
import { LanguageGrammarDefinitionContribution } from '@theia/monaco/lib/browser/textmate';
import { RubyGrammarContribution } from './ruby-grammar-contribution';

export default new ContainerModule(bind => {
    // add your contribution bindings here
    
    bind(RubyClientContribution).toSelf().inSingletonScope();
    bind(LanguageClientContribution).toDynamicValue(ctx => ctx.container.get(RubyClientContribution));

    bind(LanguageGrammarDefinitionContribution).to(RubyGrammarContribution).inSingletonScope();
});