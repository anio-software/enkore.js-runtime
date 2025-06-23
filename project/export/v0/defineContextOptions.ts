import type {
	EnkoreJSRuntimeContextOptions,
	RawType
} from "@anio-software/enkore-private.spec"

import {
	createJSRuntimeContextOptions
} from "@anio-software/enkore-private.spec/factory"

export function defineContextOptions(
	options: RawType<EnkoreJSRuntimeContextOptions>
): EnkoreJSRuntimeContextOptions {
	const entity = createJSRuntimeContextOptions(options)

	entity.__internalDoNotUse = {
		originatingPackage: {
			...options.project.packageJSON
		}
	}

	return entity
}
