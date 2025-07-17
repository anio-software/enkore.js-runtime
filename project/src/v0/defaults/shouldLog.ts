import type {
	EnkoreJSRuntimeContextOptions
} from "@anio-software/enkore-private.spec"

import {defaultGetCurrentLogLevel} from "./getCurrentLogLevel.ts"
import {compareLogLevel} from "../compareLogLevel.ts"

export const defaultShouldLog: NonNullable<EnkoreJSRuntimeContextOptions["shouldLog"]> = function(
	context,
	level,
	tag,
	extra
) {
	void tag;
	void extra;

	const contextOptions = context.optionsUsedToCreateContext

	const currentLogLevel = (() => {
		if (!contextOptions.getCurrentLogLevel) {
			// default get current log level will never return 'null'
			return defaultGetCurrentLogLevel(context)!
		}

		let newLogLevel = contextOptions.getCurrentLogLevel(context)

		if (newLogLevel === null) {
			return defaultGetCurrentLogLevel(context)!
		}

		return newLogLevel
	})()

	return compareLogLevel(
		level,
		">=",
		currentLogLevel
	)
}
