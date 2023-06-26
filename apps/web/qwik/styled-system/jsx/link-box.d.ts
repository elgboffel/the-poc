/* eslint-disable */
import type { FunctionComponent } from '@builder.io/qwik'
import type { LinkBoxProperties } from '../patterns/link-box'
import type { HTMLStyledProps } from '../types/jsx'

type Assign<T, U> = {
  [K in keyof T]?: K extends keyof T ? (K extends keyof U ? T[K] & U[K] : T[K]) : never
} & U

export type LinkBoxProps = Assign<HTMLStyledProps<'div'>, Omit<LinkBoxProperties, "">>


export declare const LinkBox: FunctionComponent<LinkBoxProps>