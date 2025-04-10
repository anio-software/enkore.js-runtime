import type {RuntimeAPI} from "#~src/RuntimeAPI.mts"
import {createRuntimeContext} from "#~src/createRuntimeContext.mts"

export const createContext: RuntimeAPI["createContext"] = function(
	project, options
) {
	return createRuntimeContext(project, options)
}
