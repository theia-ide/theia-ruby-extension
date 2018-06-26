import { RubyCommandContribution, RubyMenuContribution } from './ruby-contribution';
import {
    CommandContribution,
    MenuContribution
} from "@theia/core/lib/common";

import { ContainerModule } from "inversify";

export default new ContainerModule(bind => {
    // add your contribution bindings here
    
    bind(CommandContribution).to(RubyCommandContribution);
    bind(MenuContribution).to(RubyMenuContribution);
    
});