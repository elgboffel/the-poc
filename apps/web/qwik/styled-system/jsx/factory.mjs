import { h } from '@builder.io/qwik'
import { css, cx, cva, assignCss } from '../css/index.mjs';
import { splitProps, normalizeHTMLProps } from '../helpers.mjs';
import { isCssProperty } from './is-valid-prop.mjs';

function styledFn(Dynamic, configOrCva = {}) {
  const cvaFn = configOrCva.__cva__ || configOrCva.__recipe__ ? configOrCva : cva(configOrCva)
  
  const StyledComponent = function StyledComponent(props) {
    const { as: Element = Dynamic, ...restProps } = props

    const [variantProps, styleProps, htmlProps, elementProps] = 
        splitProps(restProps, cvaFn.variantKeys, isCssProperty, normalizeHTMLProps.keys)
    
    const { css: cssStyles, ...propStyles } = styleProps

    function recipeClass() {
      const styles = assignCss(propStyles, cssStyles)
      return cx(cvaFn(variantProps), css(styles), elementProps.class)
    }

    function cvaClass() {
      const cvaStyles = cvaFn.resolve(variantProps)
      const styles = assignCss(cvaStyles, propStyles, cssStyles)
      return cx(css(styles), elementProps.class)
    }

    const classes = configOrCva.__recipe__ ? recipeClass : cvaClass

    return h(Element, {
      ...elementProps,
      ...normalizeHTMLProps(htmlProps),
      class: classes(),
    })
  }
  
  StyledComponent.displayName = `styled.${Dynamic}`
  return StyledComponent
}

function createJsxFactory() {
  const cache = new Map()

  return new Proxy(styledFn, {
    apply(_, __, args) {
      return styledFn(...args)
    },
    get(_, el) {
      if (!cache.has(el)) {
        cache.set(el, styledFn(el))
      }
      return cache.get(el)
    },
  })
}

export const styled = createJsxFactory()
