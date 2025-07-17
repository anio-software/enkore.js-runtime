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

	if (entity.__internalDoNotUse) {
		entity.__internalDoNotUse.originatingPackage = {
			...options.project.packageJSON
		}
	}

	return entity
}
