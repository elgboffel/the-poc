/* eslint-disable */
import type { FunctionComponent } from '@builder.io/qwik'
import type { FloatProperties } from '../patterns/float'
import type { HTMLStyledProps } from '../types/jsx'

type Assign<T, U> = {
  [K in keyof T]?: K extends keyof T ? (K extends keyof U ? T[K] & U[K] : T[K]) : never
} & U

export type FloatProps = Assign<HTMLStyledProps<'div'>, Omit<FloatProperties, "">>


export declare const Float: FunctionComponent<FloatProps>