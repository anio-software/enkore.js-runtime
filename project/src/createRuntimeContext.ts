import {
	type EnkoreJSRuntimeProject,
	type EnkoreJSRuntimeContext,
	type EnkoreJSRuntimeContextOptions,
	createEntity
} from "@anio-software/enkore-private.spec"

import type {
	JSRuntimeLogLevelTuple
} from "@anio-software/enkore-private.spec/primitives"

import {defaultLogWithLevel} from "./defaults/logWithLevel.ts"

export function createRuntimeContext(
	project: EnkoreJSRuntimeProject,
	userOptions: EnkoreJSRuntimeContextOptions|undefined
): EnkoreJSRuntimeContext {
	const options = userOptions ?? createEntity("EnkoreJSRuntimeContextOptions", 0, 0, {

	})

	const context = createEntity("EnkoreJSRuntimeContext", 0, 0, {
		log: {} as any,
		options,
		currentProject: createEntity("EnkoreJSRuntimeProject", 0, 0, {
			enkoreConfiguration: project.enkoreConfiguration,
			packageJSON: project.packageJSON,
			projectId: project.projectId
		}),
		originatingPackage: {
			name: project.packageJSON.name,
			version: project.packageJSON.version,
			author: project.packageJSON.author,
			license: project.packageJSON.license
		}
	})

	const logLevels: JSRuntimeLogLevelTuple = [
		"fatal", "error", "warn", "info", "debug", "trace"
	]

	const logFunction: any = function(...args: any[]) {
		if (!options.logWithLevel) {
			defaultLogWithLevel(context, "info", args)
		} else {
			options.logWithLevel(context, "info", args)
		}
	}

	for (const logLevel of logLevels) {
		logFunction[logLevel] = function(...args: any[]) {
			if (!options.logWithLevel) {
				defaultLogWithLevel(context, logLevel, args)
			} else {
				options.logWithLevel(context, logLevel, args)
			}
		}
	}

	context.log = logFunction

	return context
}
