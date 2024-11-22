export interface ColorProps {
    readonly [key: string]: string
}

export type KeyedObject = {
    [key: string]: string | number | KeyedObject | any
}
