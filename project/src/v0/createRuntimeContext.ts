import {
	type EnkoreJSRuntimeContext,
	type EnkoreJSRuntimeContextOptions,
	createEntity
} from "@anio-software/enkore-private.spec"

import type {
	JSRuntimeLogLevelTuple
} from "@anio-software/enkore-private.spec/primitives"

import {defaultLogWithLevel} from "./defaults/logWithLevel.ts"

export function createRuntimeContext(
	contextOptions: EnkoreJSRuntimeContextOptions
): EnkoreJSRuntimeContext {
	const context = createEntity("EnkoreJSRuntimeContext", 0, 0, {
		log: {} as any,
		optionsUsedToCreateContext: contextOptions,
		currentProject: contextOptions.project,
		currentPackage: {
			...contextOptions.__internalDoNotUse!.originatingPackage
		}
	})

	const logLevels: JSRuntimeLogLevelTuple = [
		"fatal", "error", "warn", "info", "debug", "trace"
	]

	const logFunction: any = function(...args: any[]) {
		if (!contextOptions.logWithLevel) {
			defaultLogWithLevel(context, "info", args)
		} else {
			contextOptions.logWithLevel(context, "info", args)
		}
	}

	for (const logLevel of logLevels) {
		logFunction[logLevel] = function(...args: any[]) {
			if (!contextOptions.logWithLevel) {
				defaultLogWithLevel(context, logLevel, args)
			} else {
				contextOptions.logWithLevel(context, logLevel, args)
			}
		}
	}

	context.log = logFunction

	return context
}
