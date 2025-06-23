import type {
	JSRuntimeLogLevel,
	JSRuntimeLogLevelTuple
} from "@anio-software/enkore-private.spec/primitives"

export function isValidLogLevelString(
	str: string
): str is JSRuntimeLogLevel {
	const logLevels: JSRuntimeLogLevelTuple = [
		"fatal",
		"error",
		"warn",
		"info",
		"debug",
		"trace"
	]

	for (const logLevel of logLevels) {
		if (logLevel === str) {
			return true
		}
	}

	return false
}
