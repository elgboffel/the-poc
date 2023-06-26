import { h } from '@builder.io/qwik'
import { styled } from './factory.mjs';
import { getWrapStyle } from '../patterns/wrap.mjs';

export const Wrap = function Wrap(props) {
  const { gap, rowGap, columnGap, align, justify, ...restProps } = props
const styleProps = getWrapStyle({gap, rowGap, columnGap, align, justify})
return h(styled.div, { ...styleProps, ...restProps })
}