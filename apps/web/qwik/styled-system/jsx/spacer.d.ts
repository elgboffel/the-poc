/* eslint-disable */
import type { FunctionComponent } from '@builder.io/qwik'
import type { SpacerProperties } from '../patterns/spacer'
import type { HTMLStyledProps } from '../types/jsx'

type Assign<T, U> = {
  [K in keyof T]?: K extends keyof T ? (K extends keyof U ? T[K] & U[K] : T[K]) : never
} & U

export type SpacerProps = Assign<HTMLStyledProps<'div'>, Omit<SpacerProperties, "">>


export declare const Spacer: FunctionComponent<SpacerProps>