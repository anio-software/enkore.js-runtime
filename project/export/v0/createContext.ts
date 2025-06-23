import type {RuntimeAPI} from "#~src/v0/RuntimeAPI.ts"
import {createRuntimeContext} from "#~src/v0/createRuntimeContext.ts"

export const createContext: RuntimeAPI["createContext"] = function(
	project, options
) {
	return createRuntimeContext(project, options)
}
