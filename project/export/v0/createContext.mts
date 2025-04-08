import type {RuntimeAPI} from "#~src/RuntimeAPI.mts"
import {createRuntimeContext} from "#~src/createRuntimeContext.mts"

export const createContext: RuntimeAPI["createContext"] = function(
	project, ctxOrOptions
) {
	if (ctxOrOptions === undefined) {
		return createRuntimeContext(project, undefined)
	} else if (ctxOrOptions.entityKind === "EnkoreJSRuntimeContext") {
		return ctxOrOptions
	} else if (ctxOrOptions.entityKind === "EnkoreJSRuntimeContextOptions") {
		return createRuntimeContext(project, ctxOrOptions)
	}

	throw new Error(`invalid createContext parameter.`)
}
