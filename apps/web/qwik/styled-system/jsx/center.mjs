import { h } from '@builder.io/qwik'
import { styled } from './factory.mjs';
import { getCenterStyle } from '../patterns/center.mjs';

export const Center = function Center(props) {
  const { inline, ...restProps } = props
const styleProps = getCenterStyle({inline})
return h(styled.div, { ...styleProps, ...restProps })
}