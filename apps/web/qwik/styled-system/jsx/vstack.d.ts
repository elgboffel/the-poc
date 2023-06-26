/* eslint-disable */
import type { FunctionComponent } from '@builder.io/qwik'
import type { VstackProperties } from '../patterns/vstack'
import type { HTMLStyledProps } from '../types/jsx'

type Assign<T, U> = {
  [K in keyof T]?: K extends keyof T ? (K extends keyof U ? T[K] & U[K] : T[K]) : never
} & U

export type VstackProps = Assign<HTMLStyledProps<'div'>, Omit<VstackProperties, "">>


export declare const VStack: FunctionComponent<VstackProps>