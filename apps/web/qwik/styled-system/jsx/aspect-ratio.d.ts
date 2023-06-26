/* eslint-disable */
import type { FunctionComponent } from '@builder.io/qwik'
import type { AspectRatioProperties } from '../patterns/aspect-ratio'
import type { HTMLStyledProps } from '../types/jsx'

type Assign<T, U> = {
  [K in keyof T]?: K extends keyof T ? (K extends keyof U ? T[K] & U[K] : T[K]) : never
} & U

export type AspectRatioProps = Assign<HTMLStyledProps<'div'>, Omit<AspectRatioProperties, | 'aspectRatio'>>


export declare const AspectRatio: FunctionComponent<AspectRatioProps>