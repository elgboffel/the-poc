import { h } from '@builder.io/qwik'
import { styled } from './factory.mjs';
import { getSpacerStyle } from '../patterns/spacer.mjs';

export const Spacer = function Spacer(props) {
  const { size, ...restProps } = props
const styleProps = getSpacerStyle({size})
return h(styled.div, { ...styleProps, ...restProps })
}