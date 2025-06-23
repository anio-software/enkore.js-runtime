import type {RuntimeAPI} from "#~src/RuntimeAPI.ts"
import {createRuntimeContext} from "#~src/createRuntimeContext.ts"

export const createContext: RuntimeAPI["createContext"] = function(
	project, options
) {
	return createRuntimeContext(project, options)
}
