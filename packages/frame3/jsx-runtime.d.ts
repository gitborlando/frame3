// JSX type definitions for Surplus initially based on those for React v0.14 but heavily modified since
// React definitions by: Asana <https://asana.com>, AssureSign <http://www.assuresign.com>, Microsoft <https://microsoft.com>, John Reilly <https://github.com/johnnyreilly/>

import { IVnode } from 'frame3-runtime-core/src/types'

// best documentation I've found for TSX typing behavior is here: https://github.com/Microsoft/TypeScript/issues/5478

export namespace JSX {
  // TSX won't currently let us define a specialized type for each intrinsic element,
  // since React just has an opaque type, so we have to use just base type here.
  type Element = (<P extends { classes: string | any[] }>(props: P) => IVnode) | IVnode
  // Defining ElementChildrenAttribute lets us type the children passed to an embedded subcomponent
  interface ElementChildrenAttribute {
    children: {}
  }
  // define untyped ref and fn attributes, so they can be used on embedded subcomponents
  interface IntrinsicAttributes {
    ref?: any
    fn?: (el: any, state: any) => any
    fn0?: (el: any, state: any) => any
    fn1?: (el: any, state: any) => any
    fn2?: (el: any, state: any) => any
    fn3?: (el: any, state: any) => any
    fn4?: (el: any, state: any) => any
    fn5?: (el: any, state: any) => any
    fn6?: (el: any, state: any) => any
    fn7?: (el: any, state: any) => any
    fn8?: (el: any, state: any) => any
    fn9?: (el: any, state: any) => any
    fn10?: (el: any, state: any) => any
    fn11?: (el: any, state: any) => any
    fn12?: (el: any, state: any) => any
    fn13?: (el: any, state: any) => any
    fn14?: (el: any, state: any) => any
    fn15?: (el: any, state: any) => any
    fn16?: (el: any, state: any) => any
    fn17?: (el: any, state: any) => any
    fn18?: (el: any, state: any) => any
    fn19?: (el: any, state: any) => any
    fn20?: (el: any, state: any) => any
  }

  interface IntrinsicElements {
    // HTML
    a: HTMLAttributes<HTMLAnchorElement>
    abbr: HTMLAttributes<HTMLElement>
    address: HTMLAttributes<HTMLElement>
    area: HTMLAttributes<HTMLAreaElement>
    article: HTMLAttributes<HTMLElement>
    aside: HTMLAttributes<HTMLElement>
    audio: HTMLAttributes<HTMLAudioElement>
    b: HTMLAttributes<HTMLElement>
    base: HTMLAttributes<HTMLBaseElement>
    bdi: HTMLAttributes<HTMLElement>
    bdo: HTMLAttributes<HTMLElement>
    big: HTMLAttributes<HTMLElement>
    blockquote: HTMLAttributes<HTMLElement>
    body: HTMLAttributes<HTMLBodyElement>
    br: HTMLAttributes<HTMLBRElement>
    button: HTMLAttributes<HTMLButtonElement>
    canvas: HTMLAttributes<HTMLCanvasElement>
    caption: HTMLAttributes<HTMLElement>
    cite: HTMLAttributes<HTMLElement>
    code: HTMLAttributes<HTMLElement>
    col: HTMLAttributes<HTMLTableColElement>
    colgroup: HTMLAttributes<HTMLTableColElement>
    data: HTMLAttributes<HTMLElement>
    datalist: HTMLAttributes<HTMLDataListElement>
    dd: HTMLAttributes<HTMLElement>
    del: HTMLAttributes<HTMLElement>
    details: HTMLAttributes<HTMLElement>
    dfn: HTMLAttributes<HTMLElement>
    dialog: HTMLAttributes<HTMLElement>
    div: HTMLAttributes<HTMLDivElement>
    dl: HTMLAttributes<HTMLDListElement>
    dt: HTMLAttributes<HTMLElement>
    em: HTMLAttributes<HTMLElement>
    embed: HTMLAttributes<HTMLEmbedElement>
    fieldset: HTMLAttributes<HTMLFieldSetElement>
    figcaption: HTMLAttributes<HTMLElement>
    figure: HTMLAttributes<HTMLElement>
    footer: HTMLAttributes<HTMLElement>
    form: HTMLAttributes<HTMLFormElement>
    h1: HTMLAttributes<HTMLHeadingElement>
    h2: HTMLAttributes<HTMLHeadingElement>
    h3: HTMLAttributes<HTMLHeadingElement>
    h4: HTMLAttributes<HTMLHeadingElement>
    h5: HTMLAttributes<HTMLHeadingElement>
    h6: HTMLAttributes<HTMLHeadingElement>
    head: HTMLAttributes<HTMLHeadElement>
    header: HTMLAttributes<HTMLElement>
    hgroup: HTMLAttributes<HTMLElement>
    hr: HTMLAttributes<HTMLHRElement>
    html: HTMLAttributes<HTMLHtmlElement>
    i: HTMLAttributes<HTMLElement>
    iframe: HTMLAttributes<HTMLIFrameElement>
    img: HTMLAttributes<HTMLImageElement>
    input: HTMLAttributes<HTMLInputElement>
    ins: HTMLAttributes<HTMLModElement>
    kbd: HTMLAttributes<HTMLElement>
    keygen: HTMLAttributes<HTMLElement>
    label: HTMLAttributes<HTMLLabelElement>
    legend: HTMLAttributes<HTMLLegendElement>
    li: HTMLAttributes<HTMLLIElement>
    link: HTMLAttributes<HTMLLinkElement>
    main: HTMLAttributes<HTMLElement>
    map: HTMLAttributes<HTMLMapElement>
    mark: HTMLAttributes<HTMLElement>
    menu: HTMLAttributes<HTMLElement>
    menuitem: HTMLAttributes<HTMLElement>
    meta: HTMLAttributes<HTMLMetaElement>
    meter: HTMLAttributes<HTMLElement>
    nav: HTMLAttributes<HTMLElement>
    noindex: HTMLAttributes<HTMLElement>
    noscript: HTMLAttributes<HTMLElement>
    object: HTMLAttributes<HTMLObjectElement>
    ol: HTMLAttributes<HTMLOListElement>
    optgroup: HTMLAttributes<HTMLOptGroupElement>
    option: HTMLAttributes<HTMLOptionElement>
    output: HTMLAttributes<HTMLElement>
    p: HTMLAttributes<HTMLParagraphElement>
    param: HTMLAttributes<HTMLParamElement>
    picture: HTMLAttributes<HTMLElement>
    pre: HTMLAttributes<HTMLPreElement>
    progress: HTMLAttributes<HTMLProgressElement>
    q: HTMLAttributes<HTMLQuoteElement>
    rp: HTMLAttributes<HTMLElement>
    rt: HTMLAttributes<HTMLElement>
    ruby: HTMLAttributes<HTMLElement>
    s: HTMLAttributes<HTMLElement>
    samp: HTMLAttributes<HTMLElement>
    script: HTMLAttributes<HTMLElement>
    section: HTMLAttributes<HTMLElement>
    select: HTMLAttributes<HTMLSelectElement>
    small: HTMLAttributes<HTMLElement>
    source: HTMLAttributes<HTMLSourceElement>
    span: HTMLAttributes<HTMLSpanElement>
    strong: HTMLAttributes<HTMLElement>
    style: HTMLAttributes<HTMLStyleElement>
    sub: HTMLAttributes<HTMLElement>
    summary: HTMLAttributes<HTMLElement>
    sup: HTMLAttributes<HTMLElement>
    table: HTMLAttributes<HTMLTableElement>
    tbody: HTMLAttributes<HTMLTableSectionElement>
    td: HTMLAttributes<HTMLTableDataCellElement>
    textarea: HTMLAttributes<HTMLTextAreaElement>
    tfoot: HTMLAttributes<HTMLTableSectionElement>
    th: HTMLAttributes<HTMLTableHeaderCellElement>
    thead: HTMLAttributes<HTMLTableSectionElement>
    time: HTMLAttributes<HTMLElement>
    title: HTMLAttributes<HTMLTitleElement>
    tr: HTMLAttributes<HTMLTableRowElement>
    track: HTMLAttributes<HTMLTrackElement>
    u: HTMLAttributes<HTMLElement>
    ul: HTMLAttributes<HTMLUListElement>
    var: HTMLAttributes<HTMLElement>
    video: HTMLAttributes<HTMLVideoElement>
    wbr: HTMLAttributes<HTMLElement>

    // SVG
    svg: SVGAttributes<SVGElement>

    animate: SVGAttributes<SVGElement>
    animateTransform: SVGAttributes<SVGElement>
    circle: SVGAttributes<SVGElement>
    clipPath: SVGAttributes<SVGElement>
    defs: SVGAttributes<SVGElement>
    desc: SVGAttributes<SVGElement>
    ellipse: SVGAttributes<SVGElement>
    feBlend: SVGAttributes<SVGElement>
    feColorMatrix: SVGAttributes<SVGElement>
    feComponentTransfer: SVGAttributes<SVGElement>
    feComposite: SVGAttributes<SVGElement>
    feConvolveMatrix: SVGAttributes<SVGElement>
    feDiffuseLighting: SVGAttributes<SVGElement>
    feDisplacementMap: SVGAttributes<SVGElement>
    feDistantLight: SVGAttributes<SVGElement>
    feFlood: SVGAttributes<SVGElement>
    feFuncA: SVGAttributes<SVGElement>
    feFuncB: SVGAttributes<SVGElement>
    feFuncG: SVGAttributes<SVGElement>
    feFuncR: SVGAttributes<SVGElement>
    feGaussianBlur: SVGAttributes<SVGElement>
    feImage: SVGAttributes<SVGElement>
    feMerge: SVGAttributes<SVGElement>
    feMergeNode: SVGAttributes<SVGElement>
    feMorphology: SVGAttributes<SVGElement>
    feOffset: SVGAttributes<SVGElement>
    fePointLight: SVGAttributes<SVGElement>
    feSpecularLighting: SVGAttributes<SVGElement>
    feSpotLight: SVGAttributes<SVGElement>
    feTile: SVGAttributes<SVGElement>
    feTurbulence: SVGAttributes<SVGElement>
    filter: SVGAttributes<SVGElement>
    foreignObject: SVGAttributes<SVGElement>
    g: SVGAttributes<SVGElement>
    image: SVGAttributes<SVGElement>
    line: SVGAttributes<SVGElement>
    linearGradient: SVGAttributes<SVGElement>
    marker: SVGAttributes<SVGElement>
    mask: SVGAttributes<SVGElement>
    metadata: SVGAttributes<SVGElement>
    path: SVGAttributes<SVGElement>
    pattern: SVGAttributes<SVGElement>
    polygon: SVGAttributes<SVGElement>
    polyline: SVGAttributes<SVGElement>
    radialGradient: SVGAttributes<SVGElement>
    rect: SVGAttributes<SVGElement>
    stop: SVGAttributes<SVGElement>
    switch: SVGAttributes<SVGElement>
    symbol: SVGAttributes<SVGElement>
    text: SVGAttributes<SVGElement>
    textPath: SVGAttributes<SVGElement>
    tspan: SVGAttributes<SVGElement>
    use: SVGAttributes<SVGElement>
    view: SVGAttributes<SVGElement>
  }

  interface EventHandler<T, E extends Event> {
    (e: E & { currentTarget: T }): void
  }

  interface SurplusAtributes<T> {
    ref?: T
    model?: any
    fn?: <U>(node: T, state?: U) => any
    fn0?: <U>(node: T, state?: U) => any
    fn1?: <U>(node: T, state?: U) => any
    fn2?: <U>(node: T, state?: U) => any
    fn3?: <U>(node: T, state?: U) => any
    fn4?: <U>(node: T, state?: U) => any
    fn5?: <U>(node: T, state?: U) => any
    fn6?: <U>(node: T, state?: U) => any
    fn7?: <U>(node: T, state?: U) => any
    fn8?: <U>(node: T, state?: U) => any
    fn9?: <U>(node: T, state?: U) => any
    fn10?: <U>(node: T, state?: U) => any
    fn11?: <U>(node: T, state?: U) => any
    fn12?: <U>(node: T, state?: U) => any
    fn13?: <U>(node: T, state?: U) => any
    fn14?: <U>(node: T, state?: U) => any
    fn15?: <U>(node: T, state?: U) => any
    fn16?: <U>(node: T, state?: U) => any
    fn17?: <U>(node: T, state?: U) => any
    fn18?: <U>(node: T, state?: U) => any
    fn19?: <U>(node: T, state?: U) => any
    fn20?: <U>(node: T, state?: U) => any
  }

  type Child = Element | string | number | boolean | null | undefined
  type Children = Child | Child[] | (Child | Child[])[] | (() => Child) | (() => Child[])

  interface DOMAttributes<T> extends SurplusAtributes<T> {
    children?: Children

    // Clipboard Events
    onCopy?: EventHandler<T, ClipboardEvent>
    onCopyCapture?: EventHandler<T, ClipboardEvent>
    onCut?: EventHandler<T, ClipboardEvent>
    onCutCapture?: EventHandler<T, ClipboardEvent>
    onPaste?: EventHandler<T, ClipboardEvent>
    onPasteCapture?: EventHandler<T, ClipboardEvent>

    // Composition Events
    onCompositionEnd?: EventHandler<T, CompositionEvent>
    onCompositionEndCapture?: EventHandler<T, CompositionEvent>
    onCompositionStart?: EventHandler<T, CompositionEvent>
    onCompositionStartCapture?: EventHandler<T, CompositionEvent>
    onCompositionUpdate?: EventHandler<T, CompositionEvent>
    onCompositionUpdateCapture?: EventHandler<T, CompositionEvent>

    // Focus Events
    onFocus?: EventHandler<T, FocusEvent>
    onFocusCapture?: EventHandler<T, FocusEvent>
    onBlur?: EventHandler<T, FocusEvent>
    onBlurCapture?: EventHandler<T, FocusEvent>

    // Form Events
    onChange?: EventHandler<T, Event>
    onChangeCapture?: EventHandler<T, Event>
    onInput?: EventHandler<T, Event>
    onInputCapture?: EventHandler<T, Event>
    onReset?: EventHandler<T, Event>
    onResetCapture?: EventHandler<T, Event>
    onSubmit?: EventHandler<T, Event>
    onSubmitCapture?: EventHandler<T, Event>

    // Image Events
    onLoad?: EventHandler<T, Event>
    onLoadCapture?: EventHandler<T, Event>
    onError?: EventHandler<T, Event> // also a Media Event
    onErrorCapture?: EventHandler<T, Event> // also a Media Event

    // Keyboard Events
    onKeyDown?: EventHandler<T, KeyboardEvent>
    onKeyDownCapture?: EventHandler<T, KeyboardEvent>
    onKeyPress?: EventHandler<T, KeyboardEvent>
    onKeyPressCapture?: EventHandler<T, KeyboardEvent>
    onKeyUp?: EventHandler<T, KeyboardEvent>
    onKeyUpCapture?: EventHandler<T, KeyboardEvent>

    // Media Events
    onAbort?: EventHandler<T, Event>
    onAbortCapture?: EventHandler<T, Event>
    onCanPlay?: EventHandler<T, Event>
    onCanPlayCapture?: EventHandler<T, Event>
    onCanPlayThrough?: EventHandler<T, Event>
    onCanPlayThroughCapture?: EventHandler<T, Event>
    onDurationChange?: EventHandler<T, Event>
    onDurationChangeCapture?: EventHandler<T, Event>
    onEmptied?: EventHandler<T, Event>
    onEmptiedCapture?: EventHandler<T, Event>
    onEncrypted?: EventHandler<T, Event>
    onEncryptedCapture?: EventHandler<T, Event>
    onEnded?: EventHandler<T, Event>
    onEndedCapture?: EventHandler<T, Event>
    onLoadedData?: EventHandler<T, Event>
    onLoadedDataCapture?: EventHandler<T, Event>
    onLoadedMetadata?: EventHandler<T, Event>
    onLoadedMetadataCapture?: EventHandler<T, Event>
    onLoadStart?: EventHandler<T, Event>
    onLoadStartCapture?: EventHandler<T, Event>
    onPause?: EventHandler<T, Event>
    onPauseCapture?: EventHandler<T, Event>
    onPlay?: EventHandler<T, Event>
    onPlayCapture?: EventHandler<T, Event>
    onPlaying?: EventHandler<T, Event>
    onPlayingCapture?: EventHandler<T, Event>
    onProgress?: EventHandler<T, Event>
    onProgressCapture?: EventHandler<T, Event>
    onRateChange?: EventHandler<T, Event>
    onRateChangeCapture?: EventHandler<T, Event>
    onSeeked?: EventHandler<T, Event>
    onSeekedCapture?: EventHandler<T, Event>
    onSeeking?: EventHandler<T, Event>
    onSeekingCapture?: EventHandler<T, Event>
    onStalled?: EventHandler<T, Event>
    onStalledCapture?: EventHandler<T, Event>
    onSuspend?: EventHandler<T, Event>
    onSuspendCapture?: EventHandler<T, Event>
    onTimeUpdate?: EventHandler<T, Event>
    onTimeUpdateCapture?: EventHandler<T, Event>
    onVolumeChange?: EventHandler<T, Event>
    onVolumeChangeCapture?: EventHandler<T, Event>
    onWaiting?: EventHandler<T, Event>
    onWaitingCapture?: EventHandler<T, Event>

    // MouseEvents
    onClick?: EventHandler<T, MouseEvent>
    onClickCapture?: EventHandler<T, MouseEvent>
    onContextMenu?: EventHandler<T, MouseEvent>
    onContextMenuCapture?: EventHandler<T, MouseEvent>
    onDoubleClick?: EventHandler<T, MouseEvent>
    onDoubleClickCapture?: EventHandler<T, MouseEvent>
    onDrag?: EventHandler<T, DragEvent>
    onDragCapture?: EventHandler<T, DragEvent>
    onDragEnd?: EventHandler<T, DragEvent>
    onDragEndCapture?: EventHandler<T, DragEvent>
    onDragEnter?: EventHandler<T, DragEvent>
    onDragEnterCapture?: EventHandler<T, DragEvent>
    onDragExit?: EventHandler<T, DragEvent>
    onDragExitCapture?: EventHandler<T, DragEvent>
    onDragLeave?: EventHandler<T, DragEvent>
    onDragLeaveCapture?: EventHandler<T, DragEvent>
    onDragOver?: EventHandler<T, DragEvent>
    onDragOverCapture?: EventHandler<T, DragEvent>
    onDragStart?: EventHandler<T, DragEvent>
    onDragStartCapture?: EventHandler<T, DragEvent>
    onDrop?: EventHandler<T, DragEvent>
    onDropCapture?: EventHandler<T, DragEvent>
    onMouseDown?: EventHandler<T, MouseEvent>
    onMouseDownCapture?: EventHandler<T, MouseEvent>
    onMouseEnter?: EventHandler<T, MouseEvent>
    onMouseLeave?: EventHandler<T, MouseEvent>
    onMouseMove?: EventHandler<T, MouseEvent>
    onMouseMoveCapture?: EventHandler<T, MouseEvent>
    onMouseOut?: EventHandler<T, MouseEvent>
    onMouseOutCapture?: EventHandler<T, MouseEvent>
    onMouseOver?: EventHandler<T, MouseEvent>
    onMouseOverCapture?: EventHandler<T, MouseEvent>
    onMouseUp?: EventHandler<T, MouseEvent>
    onMouseUpCapture?: EventHandler<T, MouseEvent>

    // Selection Events
    onSelect?: EventHandler<T, Event>
    onSelectCapture?: EventHandler<T, Event>

    // Touch Events
    onTouchCancel?: EventHandler<T, TouchEvent>
    onTouchCancelCapture?: EventHandler<T, TouchEvent>
    onTouchEnd?: EventHandler<T, TouchEvent>
    onTouchEndCapture?: EventHandler<T, TouchEvent>
    onTouchMove?: EventHandler<T, TouchEvent>
    onTouchMoveCapture?: EventHandler<T, TouchEvent>
    onTouchStart?: EventHandler<T, TouchEvent>
    onTouchStartCapture?: EventHandler<T, TouchEvent>

    // UI Events
    onScroll?: EventHandler<T, UIEvent>
    onScrollCapture?: EventHandler<T, UIEvent>

    // Wheel Events
    onWheel?: EventHandler<T, WheelEvent>
    onWheelCapture?: EventHandler<T, WheelEvent>

    // Animation Events
    onAnimationStart?: EventHandler<T, AnimationEvent>
    onAnimationStartCapture?: EventHandler<T, AnimationEvent>
    onAnimationEnd?: EventHandler<T, AnimationEvent>
    onAnimationEndCapture?: EventHandler<T, AnimationEvent>
    onAnimationIteration?: EventHandler<T, AnimationEvent>
    onAnimationIterationCapture?: EventHandler<T, AnimationEvent>

    // Transition Events
    onTransitionEnd?: EventHandler<T, TransitionEvent>
    onTransitionEndCapture?: EventHandler<T, TransitionEvent>
  }

  interface HTMLAttributes<T> extends DOMAttributes<T> {
    // Standard HTML Attributes
    accept?: string
    acceptCharset?: string
    accessKey?: string
    action?: string
    allowFullScreen?: boolean
    allowTransparency?: boolean
    alt?: string
    async?: boolean
    autoComplete?: string
    autoFocus?: boolean
    autoPlay?: boolean
    capture?: boolean
    cellPadding?: number | string
    cellSpacing?: number | string
    charSet?: string
    challenge?: string
    checked?: boolean
    // classID?: string
    // className?: string
    // class?: string
    // classList?: any[]
    classes?: string | any[]
    cols?: number
    colSpan?: number
    content?: string
    contentEditable?: boolean
    contextMenu?: string
    controls?: boolean
    coords?: string
    crossOrigin?: string
    data?: string
    dateTime?: string
    default?: boolean
    defer?: boolean
    dir?: string
    disabled?: boolean
    download?: any
    draggable?: boolean
    encType?: string
    form?: string
    formAction?: string
    formEncType?: string
    formMethod?: string
    formNoValidate?: boolean
    formTarget?: string
    frameBorder?: number | string
    headers?: string
    height?: number | string
    hidden?: boolean
    high?: number
    href?: string
    hrefLang?: string
    htmlFor?: string
    for?: string
    httpEquiv?: string
    id?: string
    innerText?: string | number
    inputMode?: string
    integrity?: string
    is?: string
    keyParams?: string
    keyType?: string
    kind?: string
    label?: string
    lang?: string
    list?: string
    loop?: boolean
    low?: number
    manifest?: string
    marginHeight?: number
    marginWidth?: number
    max?: number | string
    maxLength?: number
    media?: string
    mediaGroup?: string
    method?: string
    min?: number | string
    minLength?: number
    multiple?: boolean
    muted?: boolean
    name?: string
    nonce?: string
    noValidate?: boolean
    open?: boolean
    optimum?: number
    pattern?: string
    placeholder?: string
    playsInline?: boolean
    poster?: string
    preload?: string
    radioGroup?: string
    readOnly?: boolean
    rel?: string
    required?: boolean
    reversed?: boolean
    role?: string
    rows?: number
    rowSpan?: number
    sandbox?: string
    scope?: string
    scoped?: boolean
    scrolling?: string
    seamless?: boolean
    selected?: boolean
    shape?: string
    size?: number
    sizes?: string
    span?: number
    spellCheck?: boolean
    src?: string
    srcDoc?: string
    srcLang?: string
    srcSet?: string
    start?: number
    step?: number | string
    style?: Partial<CSSStyleDeclaration>
    summary?: string
    tabIndex?: number
    target?: string
    title?: string
    type?: string
    useMap?: string
    value?: string | string[] | number
    width?: number | string
    wmode?: string
    wrap?: string

    // RDFa Attributes
    about?: string
    datatype?: string
    inlist?: any
    prefix?: string
    property?: string
    resource?: string
    typeof?: string
    vocab?: string

    // Non-standard Attributes
    autoCapitalize?: string
    autoCorrect?: string
    autoSave?: string
    color?: string
    itemProp?: string
    itemScope?: boolean
    itemType?: string
    itemID?: string
    itemRef?: string
    results?: number
    security?: string
    unselectable?: boolean

    // deep style properties

    'style-alignContent'?: string | null
    'style-alignItems'?: string | null
    'style-alignmentBaseline'?: string | null
    'style-alignSelf'?: string | null
    'style-animation'?: string | null
    'style-animationDelay'?: string | null
    'style-animationDirection'?: string | null
    'style-animationDuration'?: string | null
    'style-animationFillMode'?: string | null
    'style-animationIterationCount'?: string | null
    'style-animationName'?: string | null
    'style-animationPlayState'?: string | null
    'style-animationTimingFunction'?: string | null
    'style-backfaceVisibility'?: string | null
    'style-background'?: string | null
    'style-backgroundAttachment'?: string | null
    'style-backgroundClip'?: string | null
    'style-backgroundColor'?: string | null
    'style-backgroundImage'?: string | null
    'style-backgroundOrigin'?: string | null
    'style-backgroundPosition'?: string | null
    'style-backgroundPositionX'?: string | null
    'style-backgroundPositionY'?: string | null
    'style-backgroundRepeat'?: string | null
    'style-backgroundSize'?: string | null
    'style-baselineShift'?: string | null
    'style-border'?: string | null
    'style-borderBottom'?: string | null
    'style-borderBottomColor'?: string | null
    'style-borderBottomLeftRadius'?: string | null
    'style-borderBottomRightRadius'?: string | null
    'style-borderBottomStyle'?: string | null
    'style-borderBottomWidth'?: string | null
    'style-borderCollapse'?: string | null
    'style-borderColor'?: string | null
    'style-borderImage'?: string | null
    'style-borderImageOutset'?: string | null
    'style-borderImageRepeat'?: string | null
    'style-borderImageSlice'?: string | null
    'style-borderImageSource'?: string | null
    'style-borderImageWidth'?: string | null
    'style-borderLeft'?: string | null
    'style-borderLeftColor'?: string | null
    'style-borderLeftStyle'?: string | null
    'style-borderLeftWidth'?: string | null
    'style-borderRadius'?: string | null
    'style-borderRight'?: string | null
    'style-borderRightColor'?: string | null
    'style-borderRightStyle'?: string | null
    'style-borderRightWidth'?: string | null
    'style-borderSpacing'?: string | null
    'style-borderStyle'?: string | null
    'style-borderTop'?: string | null
    'style-borderTopColor'?: string | null
    'style-borderTopLeftRadius'?: string | null
    'style-borderTopRightRadius'?: string | null
    'style-borderTopStyle'?: string | null
    'style-borderTopWidth'?: string | null
    'style-borderWidth'?: string | null
    'style-bottom'?: string | null
    'style-boxShadow'?: string | null
    'style-boxSizing'?: string | null
    'style-breakAfter'?: string | null
    'style-breakBefore'?: string | null
    'style-breakInside'?: string | null
    'style-captionSide'?: string | null
    'style-clear'?: string | null
    'style-clip'?: string | null
    'style-clipPath'?: string | null
    'style-clipRule'?: string | null
    'style-color'?: string | null
    'style-colorInterpolationFilters'?: string | null
    'style-columnCount'?: any
    'style-columnFill'?: string | null
    'style-columnGap'?: any
    'style-columnRule'?: string | null
    'style-columnRuleColor'?: any
    'style-columnRuleStyle'?: string | null
    'style-columnRuleWidth'?: any
    'style-columns'?: string | null
    'style-columnSpan'?: string | null
    'style-columnWidth'?: any
    'style-content'?: string | null
    'style-counterIncrement'?: string | null
    'style-counterReset'?: string | null
    'style-cssFloat'?: string | null
    'style-cssText'?: string
    'style-cursor'?: string | null
    'style-direction'?: string | null
    'style-display'?: string | null
    'style-dominantBaseline'?: string | null
    'style-emptyCells'?: string | null
    'style-enableBackground'?: string | null
    'style-fill'?: string | null
    'style-fillOpacity'?: string | null
    'style-fillRule'?: string | null
    'style-filter'?: string | null
    'style-flex'?: string | null
    'style-flexBasis'?: string | null
    'style-flexDirection'?: string | null
    'style-flexFlow'?: string | null
    'style-flexGrow'?: string | null
    'style-flexShrink'?: string | null
    'style-flexWrap'?: string | null
    'style-floodColor'?: string | null
    'style-floodOpacity'?: string | null
    'style-font'?: string | null
    'style-fontFamily'?: string | null
    'style-fontFeatureSettings'?: string | null
    'style-fontSize'?: string | null
    'style-fontSizeAdjust'?: string | null
    'style-fontStretch'?: string | null
    'style-fontStyle'?: string | null
    'style-fontVariant'?: string | null
    'style-fontWeight'?: string | null
    'style-glyphOrientationHorizontal'?: string | null
    'style-glyphOrientationVertical'?: string | null
    'style-height'?: string | null
    'style-imeMode'?: string | null
    'style-justifyContent'?: string | null
    'style-kerning'?: string | null
    'style-layoutGrid'?: string | null
    'style-layoutGridChar'?: string | null
    'style-layoutGridLine'?: string | null
    'style-layoutGridMode'?: string | null
    'style-layoutGridType'?: string | null
    'style-left'?: string | null
    'style-letterSpacing'?: string | null
    'style-lightingColor'?: string | null
    'style-lineBreak'?: string | null
    'style-lineHeight'?: string | null
    'style-listStyle'?: string | null
    'style-listStyleImage'?: string | null
    'style-listStylePosition'?: string | null
    'style-listStyleType'?: string | null
    'style-margin'?: string | null
    'style-marginBottom'?: string | null
    'style-marginLeft'?: string | null
    'style-marginRight'?: string | null
    'style-marginTop'?: string | null
    'style-marker'?: string | null
    'style-markerEnd'?: string | null
    'style-markerMid'?: string | null
    'style-markerStart'?: string | null
    'style-mask'?: string | null
    'style-maxHeight'?: string | null
    'style-maxWidth'?: string | null
    'style-minHeight'?: string | null
    'style-minWidth'?: string | null
    'style-msContentZoomChaining'?: string | null
    'style-msContentZooming'?: string | null
    'style-msContentZoomLimit'?: string | null
    'style-msContentZoomLimitMax'?: any
    'style-msContentZoomLimitMin'?: any
    'style-msContentZoomSnap'?: string | null
    'style-msContentZoomSnapPoints'?: string | null
    'style-msContentZoomSnapType'?: string | null
    'style-msFlowFrom'?: string | null
    'style-msFlowInto'?: string | null
    'style-msFontFeatureSettings'?: string | null
    'style-msGridColumn'?: any
    'style-msGridColumnAlign'?: string | null
    'style-msGridColumns'?: string | null
    'style-msGridColumnSpan'?: any
    'style-msGridRow'?: any
    'style-msGridRowAlign'?: string | null
    'style-msGridRows'?: string | null
    'style-msGridRowSpan'?: any
    'style-msHighContrastAdjust'?: string | null
    'style-msHyphenateLimitChars'?: string | null
    'style-msHyphenateLimitLines'?: any
    'style-msHyphenateLimitZone'?: any
    'style-msHyphens'?: string | null
    'style-msImeAlign'?: string | null
    'style-msOverflowStyle'?: string | null
    'style-msScrollChaining'?: string | null
    'style-msScrollLimit'?: string | null
    'style-msScrollLimitXMax'?: any
    'style-msScrollLimitXMin'?: any
    'style-msScrollLimitYMax'?: any
    'style-msScrollLimitYMin'?: any
    'style-msScrollRails'?: string | null
    'style-msScrollSnapPointsX'?: string | null
    'style-msScrollSnapPointsY'?: string | null
    'style-msScrollSnapType'?: string | null
    'style-msScrollSnapX'?: string | null
    'style-msScrollSnapY'?: string | null
    'style-msScrollTranslation'?: string | null
    'style-msTextCombineHorizontal'?: string | null
    'style-msTextSizeAdjust'?: any
    'style-msTouchAction'?: string | null
    'style-msTouchSelect'?: string | null
    'style-msUserSelect'?: string | null
    'style-msWrapFlow'?: string
    'style-msWrapMargin'?: any
    'style-msWrapThrough'?: string
    'style-opacity'?: string | null
    'style-order'?: string | null
    'style-orphans'?: string | null
    'style-outline'?: string | null
    'style-outlineColor'?: string | null
    'style-outlineOffset'?: string | null
    'style-outlineStyle'?: string | null
    'style-outlineWidth'?: string | null
    'style-overflow'?: string | null
    'style-overflowX'?: string | null
    'style-overflowY'?: string | null
    'style-padding'?: string | null
    'style-paddingBottom'?: string | null
    'style-paddingLeft'?: string | null
    'style-paddingRight'?: string | null
    'style-paddingTop'?: string | null
    'style-pageBreakAfter'?: string | null
    'style-pageBreakBefore'?: string | null
    'style-pageBreakInside'?: string | null
    'style-perspective'?: string | null
    'style-perspectiveOrigin'?: string | null
    'style-pointerEvents'?: string | null
    'style-position'?: string | null
    'style-quotes'?: string | null
    'style-right'?: string | null
    'style-rotate'?: string | null
    'style-rubyAlign'?: string | null
    'style-rubyOverhang'?: string | null
    'style-rubyPosition'?: string | null
    'style-scale'?: string | null
    'style-show'?: any | null
    'style-stopColor'?: string | null
    'style-stopOpacity'?: string | null
    'style-stroke'?: string | null
    'style-strokeDasharray'?: string | null
    'style-strokeDashoffset'?: string | null
    'style-strokeLinecap'?: string | null
    'style-strokeLinejoin'?: string | null
    'style-strokeMiterlimit'?: string | null
    'style-strokeOpacity'?: string | null
    'style-strokeWidth'?: string | null
    'style-tableLayout'?: string | null
    'style-textAlign'?: string | null
    'style-textAlignLast'?: string | null
    'style-textAnchor'?: string | null
    'style-textDecoration'?: string | null
    'style-textIndent'?: string | null
    'style-textJustify'?: string | null
    'style-textKashida'?: string | null
    'style-textKashidaSpace'?: string | null
    'style-textOverflow'?: string | null
    'style-textShadow'?: string | null
    'style-textTransform'?: string | null
    'style-textUnderlinePosition'?: string | null
    'style-top'?: string | null
    'style-touchAction'?: string | null
    'style-transform'?: string | null
    'style-transformOrigin'?: string | null
    'style-transformStyle'?: string | null
    'style-transition'?: string | null
    'style-transitionDelay'?: string | null
    'style-transitionDuration'?: string | null
    'style-transitionProperty'?: string | null
    'style-transitionTimingFunction'?: string | null
    'style-translate'?: string | null
    'style-unicodeBidi'?: string | null
    'style-verticalAlign'?: string | null
    'style-visibility'?: string | null
    'style-webkitAlignContent'?: string | null
    'style-webkitAlignItems'?: string | null
    'style-webkitAlignSelf'?: string | null
    'style-webkitAnimation'?: string | null
    'style-webkitAnimationDelay'?: string | null
    'style-webkitAnimationDirection'?: string | null
    'style-webkitAnimationDuration'?: string | null
    'style-webkitAnimationFillMode'?: string | null
    'style-webkitAnimationIterationCount'?: string | null
    'style-webkitAnimationName'?: string | null
    'style-webkitAnimationPlayState'?: string | null
    'style-webkitAnimationTimingFunction'?: string | null
    'style-webkitAppearance'?: string | null
    'style-webkitBackfaceVisibility'?: string | null
    'style-webkitBackgroundClip'?: string | null
    'style-webkitBackgroundOrigin'?: string | null
    'style-webkitBackgroundSize'?: string | null
    'style-webkitBorderBottomLeftRadius'?: string | null
    'style-webkitBorderBottomRightRadius'?: string | null
    'style-webkitBorderImage'?: string | null
    'style-webkitBorderRadius'?: string | null
    'style-webkitBorderTopLeftRadius'?: string | null
    'style-webkitBorderTopRightRadius'?: string | null
    'style-webkitBoxAlign'?: string | null
    'style-webkitBoxDirection'?: string | null
    'style-webkitBoxFlex'?: string | null
    'style-webkitBoxOrdinalGroup'?: string | null
    'style-webkitBoxOrient'?: string | null
    'style-webkitBoxPack'?: string | null
    'style-webkitBoxSizing'?: string | null
    'style-webkitColumnBreakAfter'?: string | null
    'style-webkitColumnBreakBefore'?: string | null
    'style-webkitColumnBreakInside'?: string | null
    'style-webkitColumnCount'?: any
    'style-webkitColumnGap'?: any
    'style-webkitColumnRule'?: string | null
    'style-webkitColumnRuleColor'?: any
    'style-webkitColumnRuleStyle'?: string | null
    'style-webkitColumnRuleWidth'?: any
    'style-webkitColumns'?: string | null
    'style-webkitColumnSpan'?: string | null
    'style-webkitColumnWidth'?: any
    'style-webkitFilter'?: string | null
    'style-webkitFlex'?: string | null
    'style-webkitFlexBasis'?: string | null
    'style-webkitFlexDirection'?: string | null
    'style-webkitFlexFlow'?: string | null
    'style-webkitFlexGrow'?: string | null
    'style-webkitFlexShrink'?: string | null
    'style-webkitFlexWrap'?: string | null
    'style-webkitJustifyContent'?: string | null
    'style-webkitOrder'?: string | null
    'style-webkitPerspective'?: string | null
    'style-webkitPerspectiveOrigin'?: string | null
    'style-webkitTapHighlightColor'?: string | null
    'style-webkitTextFillColor'?: string | null
    'style-webkitTextSizeAdjust'?: any
    'style-webkitTextStroke'?: string | null
    'style-webkitTextStrokeColor'?: string | null
    'style-webkitTextStrokeWidth'?: string | null
    'style-webkitTransform'?: string | null
    'style-webkitTransformOrigin'?: string | null
    'style-webkitTransformStyle'?: string | null
    'style-webkitTransition'?: string | null
    'style-webkitTransitionDelay'?: string | null
    'style-webkitTransitionDuration'?: string | null
    'style-webkitTransitionProperty'?: string | null
    'style-webkitTransitionTimingFunction'?: string | null
    'style-webkitUserModify'?: string | null
    'style-webkitUserSelect'?: string | null
    'style-webkitWritingMode'?: string | null
    'style-whiteSpace'?: string | null
    'style-widows'?: string | null
    'style-width'?: string | null
    'style-wordBreak'?: string | null
    'style-wordSpacing'?: string | null
    'style-wordWrap'?: string | null
    'style-writingMode'?: string | null
    'style-zIndex'?: string | null
    'style-zoom'?: string | null
    'style-resize'?: string | null
    'style-userSelect'?: string | null
  }

  interface SVGAttributes<T> extends HTMLAttributes<T> {
    accentHeight?: number | string
    accumulate?: 'none' | 'sum'
    additive?: 'replace' | 'sum'
    alignmentBaseline?:
      | 'auto'
      | 'baseline'
      | 'before-edge'
      | 'text-before-edge'
      | 'middle'
      | 'central'
      | 'after-edge'
      | 'text-after-edge'
      | 'ideographic'
      | 'alphabetic'
      | 'hanging'
      | 'mathematical'
      | 'inherit'
    allowReorder?: 'no' | 'yes'
    alphabetic?: number | string
    amplitude?: number | string
    arabicForm?: 'initial' | 'medial' | 'terminal' | 'isolated'
    ascent?: number | string
    attributeName?: string
    attributeType?: string
    autoReverse?: number | string
    azimuth?: number | string
    baseFrequency?: number | string
    baselineShift?: number | string
    baseProfile?: number | string
    bbox?: number | string
    begin?: number | string
    bias?: number | string
    by?: number | string
    calcMode?: number | string
    capHeight?: number | string
    clip?: number | string
    clipPath?: string
    clipPathUnits?: number | string
    clipRule?: number | string
    colorInterpolation?: number | string
    colorInterpolationFilters?: 'auto' | 'sRGB' | 'linearRGB' | 'inherit'
    colorProfile?: number | string
    colorRendering?: number | string
    contentScriptType?: number | string
    contentStyleType?: number | string
    cursor?: number | string
    cx?: number | string
    cy?: number | string
    d?: string
    decelerate?: number | string
    descent?: number | string
    diffuseConstant?: number | string
    direction?: number | string
    display?: number | string
    divisor?: number | string
    dominantBaseline?: number | string
    dur?: number | string
    dx?: number | string
    dy?: number | string
    edgeMode?: number | string
    elevation?: number | string
    enableBackground?: number | string
    end?: number | string
    exponent?: number | string
    externalResourcesRequired?: number | string
    fill?: string
    fillOpacity?: number | string
    fillRule?: 'nonzero' | 'evenodd' | 'inherit'
    filter?: string
    filterRes?: number | string
    filterUnits?: number | string
    floodColor?: number | string
    floodOpacity?: number | string
    focusable?: number | string
    fontFamily?: string
    fontSize?: number | string
    fontSizeAdjust?: number | string
    fontStretch?: number | string
    fontStyle?: number | string
    fontVariant?: number | string
    fontWeight?: number | string
    format?: number | string
    from?: number | string
    fx?: number | string
    fy?: number | string
    g1?: number | string
    g2?: number | string
    glyphName?: number | string
    glyphOrientationHorizontal?: number | string
    glyphOrientationVertical?: number | string
    glyphRef?: number | string
    gradientTransform?: string
    gradientUnits?: string
    hanging?: number | string
    horizAdvX?: number | string
    horizOriginX?: number | string
    ideographic?: number | string
    imageRendering?: number | string
    in2?: number | string
    in?: string
    intercept?: number | string
    k1?: number | string
    k2?: number | string
    k3?: number | string
    k4?: number | string
    k?: number | string
    kernelMatrix?: number | string
    kernelUnitLength?: number | string
    kerning?: number | string
    keyPoints?: number | string
    keySplines?: number | string
    keyTimes?: number | string
    lengthAdjust?: number | string
    letterSpacing?: number | string
    lightingColor?: number | string
    limitingConeAngle?: number | string
    local?: number | string
    markerEnd?: string
    markerHeight?: number | string
    markerMid?: string
    markerStart?: string
    markerUnits?: number | string
    markerWidth?: number | string
    mask?: string
    maskContentUnits?: number | string
    maskUnits?: number | string
    mathematical?: number | string
    mode?: number | string
    numOctaves?: number | string
    offset?: number | string
    opacity?: number | string
    operator?: number | string
    order?: number | string
    orient?: number | string
    orientation?: number | string
    origin?: number | string
    overflow?: number | string
    overlinePosition?: number | string
    overlineThickness?: number | string
    paintOrder?: number | string
    panose1?: number | string
    pathLength?: number | string
    patternContentUnits?: string
    patternTransform?: number | string
    patternUnits?: string
    pointerEvents?: number | string
    points?: string
    pointsAtX?: number | string
    pointsAtY?: number | string
    pointsAtZ?: number | string
    preserveAlpha?: number | string
    preserveAspectRatio?: string
    primitiveUnits?: number | string
    r?: number | string
    radius?: number | string
    refX?: number | string
    refY?: number | string
    renderingIntent?: number | string
    repeatCount?: number | string
    repeatDur?: number | string
    requiredExtensions?: number | string
    requiredFeatures?: number | string
    restart?: number | string
    result?: string
    rotate?: number | string
    rx?: number | string
    ry?: number | string
    scale?: number | string
    seed?: number | string
    shapeRendering?: number | string
    slope?: number | string
    spacing?: number | string
    specularConstant?: number | string
    specularExponent?: number | string
    speed?: number | string
    spreadMethod?: string
    startOffset?: number | string
    stdDeviation?: number | string
    stemh?: number | string
    stemv?: number | string
    stitchTiles?: number | string
    stopColor?: string
    stopOpacity?: number | string
    strikethroughPosition?: number | string
    strikethroughThickness?: number | string
    string?: number | string
    stroke?: string
    strokeDasharray?: string | number
    strokeDashoffset?: string | number
    strokeLinecap?: 'butt' | 'round' | 'square' | 'inherit'
    strokeLinejoin?: 'miter' | 'round' | 'bevel' | 'inherit'
    strokeMiterlimit?: number | string
    strokeOpacity?: number | string
    strokeWidth?: number | string
    surfaceScale?: number | string
    systemLanguage?: number | string
    tableValues?: number | string
    targetX?: number | string
    targetY?: number | string
    textAnchor?: string
    textDecoration?: number | string
    textLength?: number | string
    textRendering?: number | string
    to?: number | string
    transform?: string
    u1?: number | string
    u2?: number | string
    underlinePosition?: number | string
    underlineThickness?: number | string
    unicode?: number | string
    unicodeBidi?: number | string
    unicodeRange?: number | string
    unitsPerEm?: number | string
    vAlphabetic?: number | string
    values?: string
    vectorEffect?: number | string
    version?: string
    vertAdvY?: number | string
    vertOriginX?: number | string
    vertOriginY?: number | string
    vHanging?: number | string
    vIdeographic?: number | string
    viewBox?: string
    viewTarget?: number | string
    visibility?: number | string
    vMathematical?: number | string
    widths?: number | string
    wordSpacing?: number | string
    writingMode?: number | string
    x1?: number | string
    x2?: number | string
    x?: number | string
    xChannelSelector?: string
    xHeight?: number | string
    xlinkActuate?: string
    xlinkArcrole?: string
    xlinkHref?: string
    xlinkRole?: string
    xlinkShow?: string
    xlinkTitle?: string
    xlinkType?: string
    xmlBase?: string
    xmlLang?: string
    xmlns?: string
    xmlnsXlink?: string
    xmlSpace?: string
    y1?: number | string
    y2?: number | string
    y?: number | string
    yChannelSelector?: string
    z?: number | string
    zoomAndPan?: string
  }
}
