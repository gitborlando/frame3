export let theme: Record<string, any> = {}

export function defineTheme<T extends Record<string, any>>(_theme: T): T {
  return (theme = _theme)
}
