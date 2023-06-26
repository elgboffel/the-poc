/* eslint-disable */
import type { FunctionComponent } from '@builder.io/qwik'
import type { WrapProperties } from '../patterns/wrap'
import type { HTMLStyledProps } from '../types/jsx'

type Assign<T, U> = {
  [K in keyof T]?: K extends keyof T ? (K extends keyof U ? T[K] & U[K] : T[K]) : never
} & U

export type WrapProps = Assign<HTMLStyledProps<'div'>, Omit<WrapProperties, "">>


export declare const Wrap: FunctionComponent<WrapProps>