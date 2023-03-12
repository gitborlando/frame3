import { h } from 'frame3'
import { JSX } from 'frame3/jsx-runtime'
import './flex.css'

type IFlex = JSX.HTMLAttributes<any> & {
  layout?: 'h' | 'v' | 'c'
  as?: keyof JSX.IntrinsicElements
  children?: any
  ref?: any
}

export const Flex = ({ as = 'div', layout = 'c', classes = [], children, ...rest }: IFlex) => {
  return h(
    as,
    {
      classes: ['flex', layout].concat(classes),
      ...rest,
    },
    [children]
  )
}
