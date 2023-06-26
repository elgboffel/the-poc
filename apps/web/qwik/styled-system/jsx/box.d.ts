/* eslint-disable */
import type { FunctionComponent } from '@builder.io/qwik'
import type { BoxProperties } from '../patterns/box'
import type { HTMLStyledProps } from '../types/jsx'

type Assign<T, U> = {
  [K in keyof T]?: K extends keyof T ? (K extends keyof U ? T[K] & U[K] : T[K]) : never
} & U

export type BoxProps = Assign<HTMLStyledProps<'div'>, Omit<BoxProperties, "">>


export declare const Box: FunctionComponent<BoxProps>