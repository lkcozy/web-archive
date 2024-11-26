import { Button } from '@web-archive/shared/components/button'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@web-archive/shared/components/collapsible'
import { Input } from '@web-archive/shared/components/input'
import { Label } from '@web-archive/shared/components/label'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@web-archive/shared/components/form'
import { useRequest } from 'ahooks'
import LoadingWrapper from './loading-wrapper'
import { getAITagConfig } from '~/data/config'

function AITagSettingCollapsible() {
  const [open, setOpen] = useState(false)

  const formSchema = z.object({
    enable: z.boolean(),
    tagLanguage: z.enum(['en', 'zh']),
    apiUrl: z.string(),
    apiUrlPath: z.string(),
    apiKey: z.string(),
    model: z.string(),
  })
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      enable: false,
      tagLanguage: 'en',
      apiUrl: '',
      apiUrlPath: '',
      apiKey: '',
      model: '',
    },
  })

  const { loading } = useRequest(
    getAITagConfig,
    {
      onSuccess: (data) => {
        form.reset(data)
      },
    },
  )

  return (
    <Collapsible
      open={open}
      onOpenChange={setOpen}
      className="w-full space-y-2"
    >
      <CollapsibleTrigger asChild>
        <Button
          variant="outline"
          className="w-full text-lg font-bold flex border-none justify-between items-center"
        >
          <div>
            AI Tag
          </div>
          <div>
            <ChevronDown size={24} className={`transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
          </div>
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <LoadingWrapper loading={loading}>
          <Form {...form}>
            <form
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="enable"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Enable</FormLabel>
                    <FormControl>

                    </FormControl>
                  </FormItem>
                )}
              >

              </FormField>
            </form>
          </Form>
        </LoadingWrapper>
      </CollapsibleContent>
    </Collapsible>
  )
}

export default AITagSettingCollapsible
