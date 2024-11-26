import type { AITagConfig } from 'types/config'

type GenerateTagProps = {
  title: string
  pageDesc: string
} & AITagConfig

export async function generateTag(props: GenerateTagProps) {
  const url = props.apiUrl + props.apiUrlPath
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${props.apiKey}`,
    },
    body: JSON.stringify({
      title: props.title,
      pageDesc: props.pageDesc,
      model: props.model,
    }),
  })

  if (!res.ok) {
    throw new Error('Failed to generate tag')
  }

  const data = await res.json()
  return data
}
