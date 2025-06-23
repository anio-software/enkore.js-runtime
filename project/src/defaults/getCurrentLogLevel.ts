import type {
	EnkoreJSRuntimeContextOptions
} from "@enkore/spec"
import {isValidLogLevelString} from "../isValidLogLevelString.ts"

function toLowerCase(v: any): string {
	if (!("toLowerCase" in v)) return ""

	return v.toLowerCase()
}

export const defaultGetCurrentLogLevel: NonNullable<EnkoreJSRuntimeContextOptions["getCurrentLogLevel"]> = function(
	context
) {
	void context;

	const defaultLogLevel = "info"
	const envKey = "ENKORE_RUNTIME_LOG_LEVEL"

	return (() => {
		let envObject: object|null = null

		// @ts-ignore:next-line
		if (typeof process === "object") {
			// @ts-ignore:next-line
			envObject = process.env
		} else if (typeof window === "object") {
			envObject = window
		}

		if (!envObject) {
			return defaultLogLevel
		} else if (!(envKey in envObject)) {
			return defaultLogLevel
		}

		const newLogLevel = toLowerCase(envObject[envKey])

		if (isValidLogLevelString(newLogLevel)) {
			return newLogLevel
		}

		return defaultLogLevel
	})()
}
