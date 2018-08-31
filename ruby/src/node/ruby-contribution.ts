/*
 * Copyright (C) 2018 TypeFox and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import { injectable } from "inversify";
import { IConnection, BaseLanguageServerContribution } from "@theia/languages/lib/node";
import { RUBY_LANGUAGE_ID, RUBY_LANGUAGE_NAME } from '../common';

// export type ConfigurationType = 'config_win' | 'config_mac' | 'config_linux';
// export const configurations = new Map<typeof process.platform, ConfigurationType>();
// configurations.set('darwin', 'config_mac');
// configurations.set('win32', 'config_win');
// configurations.set('linux', 'config_linux');

@injectable()
export class RubyContribution extends BaseLanguageServerContribution {

    readonly id = RUBY_LANGUAGE_ID;
    readonly name = RUBY_LANGUAGE_NAME;

    start(clientConnection: IConnection): void {
        const command = 'solargraph';
        const args: string[] = [
            'stdio'
        ];
        console.info("starting Ruby language server...")
        
        const serverConnection = this.createProcessStreamConnection(command, args);
        // serverConnection.reader.onError(err => console.log(err));
        this.forward(clientConnection, serverConnection);
    }

    protected onDidFailSpawnProcess(error: Error): void {
        super.onDidFailSpawnProcess(error);
        console.error("Error starting ruby language server.");
        console.error("Please make sure it is installed on your system.");
    }
}
