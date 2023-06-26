import { h } from '@builder.io/qwik'
import { styled } from './factory.mjs';
import { getCircleStyle } from '../patterns/circle.mjs';

export const Circle = function Circle(props) {
  const { size, ...restProps } = props
const styleProps = getCircleStyle({size})
return h(styled.div, { ...styleProps, ...restProps })
}