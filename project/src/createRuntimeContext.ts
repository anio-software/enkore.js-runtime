import {
	type EnkoreJSRuntimeProject,
	type EnkoreJSRuntimeContext,
	type EnkoreJSRuntimeContextOptions,
	createEntity
} from "@enkore/spec"

import type {
	JSRuntimeLogLevelTuple
} from "@enkore/spec/primitives"

export function createRuntimeContext(
	project: EnkoreJSRuntimeProject,
	userOptions: EnkoreJSRuntimeContextOptions|undefined
): EnkoreJSRuntimeContext {
	const options = userOptions ?? createEntity("EnkoreJSRuntimeContextOptions", 0, 0, {

	})

	const logLevels: JSRuntimeLogLevelTuple = [
		"fatal", "error", "warn", "info", "debug", "trace"
	]

	const log: any = function(...args: any[]) {
		console.log("project", project.packageJSON.name, "says", args)
	}

	for (const logLevel of logLevels) {
		log[logLevel] = function(...args: any[]) {
			console.log("project", project.packageJSON.name, "says", args)
		}
	}

	return createEntity("EnkoreJSRuntimeContext", 0, 0, {
		log,
		options,
		currentProject: createEntity("EnkoreJSRuntimeProject", 0, 0, {
			enkoreConfiguration: project.enkoreConfiguration,
			packageJSON: project.packageJSON
		}),
		originatingPackage: {
			name: project.packageJSON.name,
			version: project.packageJSON.version,
			author: project.packageJSON.author,
			license: project.packageJSON.license
		}
	})
}
