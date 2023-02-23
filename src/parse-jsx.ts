interface IJsx {
  tag: string
  props: Record<string, string>
  children: string[]
}

let i: number, code: string, stack: any[], bracketStack: string[]

function init(js: string) {
  i = 0
  code = js
  stack = []
  bracketStack = []
}

export function parseJsx(js: string) {
  init(js)
  let quoteStack: string[] = []
  let jsxStartI = 0
  while (i < code.length) {
    if (code[i].match(/[`"']/)) {
      if (quoteStack.some((quote) => quote === code[i])) quoteStack.pop()
      else quoteStack.push(code[i])
    }
    if (code[i] === '<' && quoteStack.length === 0) {
      let t = i + 1
      while (t < code.length) {
        if (code[t].match(/\w\s/)) continue
        if (code[t] === '>' || (code[t] === '/' && code[t + 1] === '>')) {
          jsxStartI = i
          break
        } else {
          break
        }
      }
    }
    if (jsxStartI !== 0) break
    i++
  }
  while (i < code.length) {
    if (code[i] === '<' && code[i + 1] !== '/') {
      i++
    }
    i++
  }
}

function parseJsxTag() {
  while (!(code[i] === '>' || (code[i] === '/' && code[i] === '>'))) {
    i++
  }
}
