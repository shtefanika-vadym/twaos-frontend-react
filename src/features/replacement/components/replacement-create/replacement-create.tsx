import type { FC } from 'react'

import { Box, Button, Flex, Group, Modal, Select, Text, Title } from '@mantine/core'
import { DatePicker } from '@mantine/dates'
import { useForm } from '@mantine/form'
import { useDisclosure } from '@mantine/hooks'
import { IconReplace } from '@tabler/icons-react'

import { Show } from 'common/components'
import { BUTTON_CONSTANTS } from 'common/constants'
import type { IRequestResponse } from 'common/interfaces'
import type { ISelect } from 'common/interfaces/select.interface'
import { Utils } from 'common/utils'

import { REPLACEMENT_FORM_KEYS_CONSTANTS } from 'features/replacement/constants/replacement-form-keys.constants'
import { REPLACEMENT_INIT_VALUES } from 'features/replacement/constants/replacement-form-value'
import { REPLACEMENT_CONSTANTS } from 'features/replacement/constants/replacement.constants'
import type { IReplacementCreate } from 'features/replacement/schemas/replacement-create.schema'
import { REPLACEMENT_CREATE_SCHEMA } from 'features/replacement/schemas/replacement-create.schema'
import { useFetchSecretariesQuery } from 'features/replacement/store/api/replacement.api'

const { addDaysInDate } = Utils

interface IProps {
  handleReplace: (data: IReplacementCreate) => Promise<void>
}

export const ReplacementCreate: FC<IProps> = ({ handleReplace }) => {
  const [opened, { open, close }] = useDisclosure(false)
  const { data: secretaries }: IRequestResponse<ISelect[]> = useFetchSecretariesQuery()
  const form = useForm({
    initialValues: REPLACEMENT_INIT_VALUES,
    validate: (values: IReplacementCreate) =>
      Utils.validateZodSchema(REPLACEMENT_CREATE_SCHEMA, values),
  })

  const handleSubmit = (values: IReplacementCreate): void => {
    handleReplace(values)
    form.reset()
    close()
  }

  return (
    <>
      <Button onClick={open} color='teal' variant='filled'>
        <Group>
          <IconReplace size='1rem' />
          {REPLACEMENT_CONSTANTS.CREATE_REPLACEMENT}
        </Group>
      </Button>
      <Modal
        size='lg'
        radius='md'
        opened={opened}
        onClose={close}
        title={REPLACEMENT_CONSTANTS.CREATE_REPLACEMENT}>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Flex direction='column'>
            <Box>
              <Title mb={10} order={4}>
                {REPLACEMENT_CONSTANTS.WHO_WILL_REPLACE_YOU}
              </Title>
              <Select
                data={secretaries}
                label={REPLACEMENT_CONSTANTS.SECRETARY_LABEL}
                placeholder={REPLACEMENT_CONSTANTS.SECRETARY_LABEL}
                {...form.getInputProps(REPLACEMENT_FORM_KEYS_CONSTANTS.SECRETARY_ID)}
              />
            </Box>

            <Box mt={30}>
              <Title mb={10} order={4}>
                {REPLACEMENT_CONSTANTS.SELECT_DATE}
              </Title>
              <Flex gap={70} justify='center'>
                <Box>
                  <DatePicker
                    maxLevel='year'
                    minDate={addDaysInDate(new Date(), 1)}
                    {...form.getInputProps(REPLACEMENT_FORM_KEYS_CONSTANTS.START_DATE)}
                  />
                  <Show when={form.errors?.start_date}>
                    <Text color='red' size='xs' inline>
                      {form.errors?.start_date}
                    </Text>
                  </Show>
                </Box>

                <Box>
                  <DatePicker
                    maxLevel='year'
                    minDate={addDaysInDate(new Date(form.values.start_date), 1)}
                    {...form.getInputProps(REPLACEMENT_FORM_KEYS_CONSTANTS.END_DATE)}
                  />
                  <Show when={form.errors?.end_date}>
                    <Text color='red' size='xs' inline>
                      {form.errors?.end_date}
                    </Text>
                  </Show>
                </Box>
              </Flex>
            </Box>

            <Group position='right' mt='xl'>
              <Button onClick={close} radius='md' variant='outline'>
                {BUTTON_CONSTANTS.CLOSE}
              </Button>
              <Button type='submit' radius='md'>
                {BUTTON_CONSTANTS.CREATE}
              </Button>
            </Group>
          </Flex>
        </form>
      </Modal>
    </>
  )
}
