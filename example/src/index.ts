import { mount } from 'frame3'
import { App } from './app'
import { useRouter } from './router'

useRouter()

mount(App, document.body)
