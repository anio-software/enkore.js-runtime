import type {RuntimeAPI} from "#~src/RuntimeAPI.ts"

export const compareLogLevel: RuntimeAPI["compareLogLevel"] = function(
	left, operator, right
) {
	return false
}
