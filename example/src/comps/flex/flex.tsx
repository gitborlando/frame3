import { h } from 'frame3'
import { JSX } from 'frame3/jsx-runtime'
import './flex.css'

type IFlex = JSX.HTMLAttributes<any> & {
  layout?: 'h' | 'v' | 'c'
  as?: keyof JSX.IntrinsicElements
  children?: any
}

export const Flex = ({ as = 'div', layout = 'c', children, className, ...rest }: IFlex) => {
  return h(
    as,
    {
      class: cls('flex', className, layout),
      ...rest,
    },
    [children]
  )
}

function cls(...args: any[]) {
  return args.join(' ')
}
