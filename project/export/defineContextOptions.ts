import type {
	EnkoreJSRuntimeContextOptions,
	RawType
} from "@anio-software/enkore-private.spec"

export function defineContextOptions(
	options: RawType<EnkoreJSRuntimeContextOptions>
): EnkoreJSRuntimeContextOptions {
	const entity: EnkoreJSRuntimeContextOptions = {
		...options,
		entityKind: "EnkoreJSRuntimeContextOptions",
		entityMajorVersion: 0,
		entityRevision: 0,
		entityCreatedBy: null
	}

	return entity
}
