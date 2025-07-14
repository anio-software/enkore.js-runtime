import {
	type EnkoreJSRuntimeContext,
	type EnkoreJSRuntimeContextOptions
} from "@anio-software/enkore-private.spec"

import type {
	JSRuntimeLogLevel,
	JSRuntimeLogLevelTuple
} from "@anio-software/enkore-private.spec/primitives"

import {defaultLogWithLevel} from "./defaults/logWithLevel.ts"

function errorToString(error: unknown): string {
	if (error instanceof Error) {
		return error.message
	} else if (Object.prototype.toString.call(error) === "[object String]") {
		return error as string
	} else {
		try {
			return JSON.stringify(error)
		} catch {
			return ""
		}
	}
}

export function createRuntimeContext(
	contextOptions: EnkoreJSRuntimeContextOptions
): EnkoreJSRuntimeContext {
	const context: EnkoreJSRuntimeContext = {
		entityKind: "EnkoreJSRuntimeContext",
		entityMajorVersion: 0,
		entityRevision: 0,
		entityCreatedBy: null,
		log: {} as any,
		logException: {} as any,
		optionsUsedToCreateContext: contextOptions,
		currentProject: contextOptions.project,
		currentPackage: {
			...contextOptions.__internalDoNotUse!.originatingPackage
		}
	}

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

	const logExceptionWithLevel = function(
		level: JSRuntimeLogLevel,
		error: unknown,
		description: string|undefined
	) {
		let logMessage = ``

		if (description) {
			logMessage += `${description}`
		} else {
			logMessage += `Caught exception`
		}

		const errorAsString = errorToString(error)

		if (errorAsString.length) {
			logMessage += ` '${errorAsString}'`
		} else {
			logMessage += ` (no message)`
		}

		if (error instanceof Error && error.stack) {
			logMessage += `\n\n${error.stack}`
		}

		if (!contextOptions.logWithLevel) {
			defaultLogWithLevel(context, level, [logMessage])
		} else {
			contextOptions.logWithLevel(context, level, [logMessage])
		}
	}

	const logException: any = function(...args: any[]) {
		if (args.length >= 2) {
			logExceptionWithLevel("error", args[1], args[0])
		} else {
			logExceptionWithLevel("error", args[0], undefined)
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

		logException[logLevel] = function(...args: any[]) {
			if (args.length >= 2) {
				logExceptionWithLevel(logLevel, args[1], args[0])
			} else {
				logExceptionWithLevel(logLevel, args[0], undefined)
			}
		}
	}

	context.log = logFunction
	context.logException = logException

	return context
}
