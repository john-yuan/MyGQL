import type { Options, SchemaFile } from '../types/options'
import { resolveScalarTypes } from './resolveScalarTypes'

export function resolveSchemaFileOptions(
  file: SchemaFile,
  globalOptions?: Options
) {
  const options: Options = { ...(file.options || {}) }

  if (globalOptions) {
    if (!file.skipGlobalScalarTypes) {
      options.scalarTypes = [
        ...resolveScalarTypes(options.scalarTypes),
        ...resolveScalarTypes(globalOptions.scalarTypes)
      ]
    }

    const resolveOption = (key: keyof Options) => {
      if (options[key] == null && globalOptions) {
        options[key] = globalOptions[key] as any
      }
    }

    resolveOption('argsSuffix')
    resolveOption('fieldsSuffix')
    resolveOption('skipLintComments')
    resolveOption('skipGeneratedTip')
    resolveOption('skipWrappingArgsEnum')
    resolveOption('skipArgs')
    resolveOption('skipFields')
    resolveOption('skipFactory')
    resolveOption('skipQuery')
    resolveOption('skipQueries')
    resolveOption('skipMutation')
    resolveOption('skipMutations')
    resolveOption('headers')
    resolveOption('footers')
  }

  return options
}
