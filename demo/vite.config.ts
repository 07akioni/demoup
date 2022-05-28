import { defineConfig } from 'vite'

export default defineConfig({
  root: __dirname,
  resolve: {
    alias: {
      demoup: '../src/index.ts'
    },
  }
})