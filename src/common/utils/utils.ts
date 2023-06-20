import type * as z from 'zod'

const validateZodSchema = <T extends z.ZodType<any, any>>(
  schema: T,
  values: z.infer<T>,
): Partial<Record<keyof z.infer<T>, string>> => {
  try {
    schema.parse(values)
    return {}
  } catch (err) {
    return err.errors.reduce((acc: any, error: any) => {
      acc[error.path[0]] = error.message
      return acc
    }, {})
  }
}

const downloadPdf = (data: string, fileName: string): void => {
  const url: string = window.URL.createObjectURL(new Blob([data]))
  const link: HTMLAnchorElement = document.createElement('a')
  link.href = url
  link.setAttribute('download', `${fileName}.pdf`)
  window.document.body.appendChild(link)
  link.click()
}

const addDaysInDate = (startDate: Date, count: number): Date => {
  startDate.setDate(startDate.getDate() + count)
  return startDate
}

const formatDateToISO = (date: Date): string => {
  const year: number = date.getFullYear()
  const month: string = String(date.getMonth() + 1).padStart(2, '0')
  const day: string = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

export const Utils = { validateZodSchema, downloadPdf, addDaysInDate, formatDateToISO }
