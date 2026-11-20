import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// El proxy del preview entra con el host público del sandbox, que no cae bajo
// la variable __VITE_ADDITIONAL_SERVER_ALLOWED_HOSTS. Solo en el entorno de
// preview (BASE44_PREVIEW_MODE === '1') se añaden esos hosts; con la variable
// sin definir o con otro valor se mantiene el comportamiento por defecto.
const previewHosts =
  process.env.BASE44_PREVIEW_MODE === '1'
    ? [
        `.${process.env.BASE44_SANDBOX_HOST_DOMAIN}`,
        process.env.BASE44_PUBLIC_HOST_SUFFIX
          ? `3000-${process.env.BASE44_PUBLIC_HOST_SUFFIX}`
          : '',
      ].filter(Boolean)
    : null

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 3000,
    strictPort: true,
    watch: { usePolling: true, interval: 300 },
    ...(previewHosts ? { allowedHosts: previewHosts } : {}),
  },
})
