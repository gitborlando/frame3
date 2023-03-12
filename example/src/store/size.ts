import { $reactive } from 'frame3'

export let $size = $reactive(1)

export function setSize(s: number) {
  $size = s
}
