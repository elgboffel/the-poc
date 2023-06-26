import { h } from '@builder.io/qwik'
import { styled } from './factory.mjs';
import { getAspectRatioStyle } from '../patterns/aspect-ratio.mjs';

export const AspectRatio = function AspectRatio(props) {
  const { ratio, ...restProps } = props
const styleProps = getAspectRatioStyle({ratio})
return h(styled.div, { ...styleProps, ...restProps })
}