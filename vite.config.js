import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  // optimizeDeps: {
  //   exclude: [
  //     '@ionic/core/loader',
  //     'js-big-decimal',
  //     "aws-sdk",
  //     'nock',
  //     "mock-aws-s3",
  //     'react-dom',
  //     'react.js',
  //     "axios",
  //     "bcrypt",
  //     "cors",
  //     "dotenv",
  //     "express",
  //     "fs",
  //     "jsonwebtoken",
  //     "mongoose",
  //     "multer",
  //     "nodemon",
  //     "path",
  //     "redux",
  //     "redux-thunk",
  //     "cloudinary",
  // ],
  // },
  plugins: [react()],
})
