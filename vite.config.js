import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://3.37.214.150:8080',
        changeOrigin: true, // origin을 대상 서버로 변경
        rewrite: (path) => path.replace(/^\/api/, '') // /api를 제거하고 요청
      }
    }
  }
})
