import type {RuntimeAPI} from "#~src/RuntimeAPI.mts"

export const compareLogLevel: RuntimeAPI["compareLogLevel"] = function(
	left, operator, right
) {
	return false
}
