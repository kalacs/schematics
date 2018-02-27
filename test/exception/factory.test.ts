import { VirtualTree } from '@angular-devkit/schematics';
import { SchematicTestRunner, UnitTestTree } from '@angular-devkit/schematics/testing';
import { expect } from 'chai';
import * as path from 'path';
import { ExceptionOptions } from '../../src/exception/schema';

describe('Exception Factory', () => {
  const options: ExceptionOptions = {
    extension: 'ts',
    name: 'name',
    path: 'path',
    rootDir: 'src/modules'
  };
  let runner: SchematicTestRunner;
  beforeEach(() => {
    runner = new SchematicTestRunner(
      '.',
      path.join(process.cwd(), 'src/collection.json')
    );
  });
  it('should generate a new exception file', () => {
    const tree: UnitTestTree = runner.runSchematic('exception', options, new VirtualTree());
    const files: string[] = tree.files;
    expect(
      files.find((filename) =>
        filename === `/${ options.rootDir }/${ options.path }/${ options.name }.exception.${ options.extension }`
      )
    ).to.not.be.undefined;
  });
  it('should generate the expected exception file content', () => {
    const tree: UnitTestTree = runner.runSchematic('exception', options, new VirtualTree());
    expect(
      tree.readContent(`/${ options.rootDir }/${ options.path }/${ options.name }.exception.${ options.extension }`)
    ).to.be.equal(
      'import { HttpException, HttpStatus } from \'@nestjs/common\';\n' +
      '\n' +
      'export class NameException extends HttpException {\n' +
      '  constructor() {\n' +
      '    super(\'Name\', HttpStatus.NOT_FOUND);\n' +
      '  }\n' +
      '}\n'
    );
  });
});
