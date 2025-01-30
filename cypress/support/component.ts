/* eslint-disable @typescript-eslint/no-namespace */
import './commands'; // Импорт ваших кастомных команд

import { mount } from '@cypress/react';

// Augment the Cypress namespace to include type definitions for
// your custom command.
declare global {
    namespace Cypress {
        interface Chainable {
            mount: typeof mount;
        }
    }
}

Cypress.Commands.add('mount', mount);
