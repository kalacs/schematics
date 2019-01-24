import { Path } from '@angular-devkit/core';
import { Empty } from '@angular-devkit/core/src/virtual-fs/host';

export interface ModuleOptions {
  /**
   * The name of the module.
   */
  name: string;
  /**
   * The path to create the module.
   */
  attributes?: string;
  /**
   * The path to create the module.
   */
  path?: string;
  /**
   * The path to insert the module declaration.
   */
  module?: Path;
  /**
   * Directive to insert declaration in module.
   */
  skipImport?: boolean;
  /**
   * Metadata name affected by declaration insertion.
   */
  metadata?: string;
  /**
   * Nest element type name
   */
  type?: string;
  /**
   * Application language.
   */
  language?: string;
  /**
   * The source root path
   */
  sourceRoot?: string;
//  decorators: Array<string | Empty>;
}
