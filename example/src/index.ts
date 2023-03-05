import { defineTheme, mount } from 'frame3'
import { App } from './app'

const theme = defineTheme({
  color: 'blue',
})

mount(App, document.body)
