import { JSX } from 'frame3/jsx-runtime'
import './flex.css'

type IFlex = JSX.HTMLAttributes<HTMLDivElement> & {
  layout: 'h' | 'v' | 'c'
  children?: any
}

export const Flex = ({ layout, children, className }: IFlex) => {
  return <div class={cls('flex', className, layout)}>{children}</div>
}

function cls(...args: any[]) {
  return args.join(' ')
}
