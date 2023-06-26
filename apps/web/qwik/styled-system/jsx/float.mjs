import { h } from '@builder.io/qwik'
import { styled } from './factory.mjs';
import { getFloatStyle } from '../patterns/float.mjs';

export const Float = function Float(props) {
  const { offsetX, offsetY, offset, placement, ...restProps } = props
const styleProps = getFloatStyle({offsetX, offsetY, offset, placement})
return h(styled.div, { ...styleProps, ...restProps })
}