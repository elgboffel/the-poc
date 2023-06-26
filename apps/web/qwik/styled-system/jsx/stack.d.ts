/* eslint-disable */
import type { FunctionComponent } from '@builder.io/qwik'
import type { StackProperties } from '../patterns/stack'
import type { HTMLStyledProps } from '../types/jsx'

type Assign<T, U> = {
  [K in keyof T]?: K extends keyof T ? (K extends keyof U ? T[K] & U[K] : T[K]) : never
} & U

export type StackProps = Assign<HTMLStyledProps<'div'>, Omit<StackProperties, "">>


export declare const Stack: FunctionComponent<StackProps>