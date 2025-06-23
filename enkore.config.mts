import {defineConfig} from "@anio-software/enkore"
import {defineTargetConfig} from "@anio-software/enkore.target-js-hybrid"

export const config: unknown = defineConfig({
	target: {
		name: "js-hybrid",
		options: defineTargetConfig({
			_disableRuntimeCodeInjection: true,

			registry: {
				"anioSoftware": {
					url: "https://npm-registry.anio.software",
					authTokenFilePath: "secrets/anio_npm_auth_token",
					clientPrivateKeyFilePath: "secrets/npm_client.pkey",
					clientCertificateFilePath: "secrets/npm_client.cert"
				}
			},

			packageSourceRegistryByScope: {
				"@anio-software": {
					registry: "anioSoftware"
				}
			},

			publish: [{
				registry: "anioSoftware"
			}]
		})
	}
})
