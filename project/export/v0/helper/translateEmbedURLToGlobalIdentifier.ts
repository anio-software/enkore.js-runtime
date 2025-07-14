import type {EnkoreJSRuntimeProjectContext} from "@anio-software/enkore-private.spec"
import {_parseEmbedURLRemoveMeAfterUpdate} from "./_parseEmbedURLRemoveMeAfterUpdate.ts"

export function translateEmbedURLToGlobalIdentifier(
	context: EnkoreJSRuntimeProjectContext,
	embedURL: string
): string {
	const {name, version} = context.project.packageJSON
	const {protocol, path} = _parseEmbedURLRemoveMeAfterUpdate(embedURL)

	return `${name}/v${version}/${protocol}/${path}`
}
