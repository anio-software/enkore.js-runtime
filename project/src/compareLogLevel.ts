import type {RuntimeAPI} from "./RuntimeAPI.ts"
import type {JSRuntimeLogLevel} from "@enkore/spec/primitives"
import {logLevelToNumber} from "./logLevelToNumber.ts"

export function compareLogLevel(
	logLevelLeft: JSRuntimeLogLevel,
	operator: Parameters<RuntimeAPI["compareLogLevel"]>[1],
	logLevelRight: JSRuntimeLogLevel
): boolean {
	const left = logLevelToNumber(logLevelLeft)
	const right = logLevelToNumber(logLevelRight)

	if (operator === ">") {
		return left > right
	} else if (operator === ">=") {
		return left >= right
	} else if (operator === "<") {
		return left < right
	} else if (operator === "<=") {
		return left <= right
	}

	throw new Error(`invalid operator "${operator}".`)
}
