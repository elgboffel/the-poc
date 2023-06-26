import { h } from '@builder.io/qwik'
import { styled } from './factory.mjs';
import { getDividerStyle } from '../patterns/divider.mjs';

export const Divider = function Divider(props) {
  const { orientation, thickness, color, ...restProps } = props
const styleProps = getDividerStyle({orientation, thickness, color})
return h(styled.div, { ...styleProps, ...restProps })
}