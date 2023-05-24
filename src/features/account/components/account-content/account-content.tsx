import { Flex, TextInput, Title } from '@mantine/core'
import { IconAlignJustified, IconAt, IconCalendar, IconCoin, IconUser } from '@tabler/icons-react'

import { useAuth } from 'app/hooks'

import { Show } from 'common/components'
import { USER_ROLES } from 'common/constants'
import type { IRequestResponse } from 'common/interfaces'

import { ACCOUNT_CONSTANTS } from 'features/account/constants/account.constants'
import { useFetchAccountDetailsQuery } from 'features/account/store/api/account.api'

export const AccountContent = () => {
  const { user } = useAuth()
  const { data = {} }: IRequestResponse = useFetchAccountDetailsQuery()

  const fullName = (): string => {
    const { first_name, initials, last_name } = data
    let name: string
    if (first_name) name = first_name
    if (last_name) name += ` ${last_name}`
    if (initials) name += ` ${initials}.`

    return name
  }

  return (
    <Flex w='100%' gap={10} direction='column'>
      <Title order={1}>{ACCOUNT_CONSTANTS.ACCOUNT}</Title>

      <TextInput
        disabled
        radius='md'
        value={fullName()}
        icon={<IconUser size='1rem' />}
        label={ACCOUNT_CONSTANTS.NAME_LABEL}
        placeholder={ACCOUNT_CONSTANTS.NAME_PLACEHOLDER}
      />

      <TextInput
        disabled
        radius='md'
        value={data.email}
        icon={<IconAt size='1rem' />}
        label={ACCOUNT_CONSTANTS.EMAIL_LABEL}
        placeholder={ACCOUNT_CONSTANTS.EMAIL_PLACEHOLDER}
      />

      <Show when={user.role !== USER_ROLES.ADMIN}>
        <TextInput
          disabled
          radius='md'
          value={data.faculty_name}
          icon={<IconAlignJustified size='1rem' />}
          label={ACCOUNT_CONSTANTS.FACULTY_NAME_LABEL}
          placeholder={ACCOUNT_CONSTANTS.FACULTY_NAME_PLACEHOLDER}
        />
      </Show>

      <Show when={user.role !== USER_ROLES.ADMIN}>
        <TextInput
          disabled
          radius='md'
          value={data.program_study}
          icon={<IconAlignJustified size='1rem' />}
          label={ACCOUNT_CONSTANTS.PROGRAM_STUDY_LABEL}
          placeholder={ACCOUNT_CONSTANTS.PROGRAM_STUDY_PLACEHOLDER}
        />
      </Show>

      <Show when={user.role === USER_ROLES.STUDENT}>
        <TextInput
          disabled
          radius='md'
          value={data.status}
          icon={<IconCoin size='1rem' />}
          label={ACCOUNT_CONSTANTS.FINANCIAL_STATUS_LABEL}
          placeholder={ACCOUNT_CONSTANTS.FINANCIAL_STATUS_PLACEHOLDER}
        />
      </Show>

      <Show when={user.role === USER_ROLES.STUDENT}>
        <TextInput
          disabled
          radius='md'
          value={data.year_study}
          icon={<IconCalendar size='1rem' />}
          label={ACCOUNT_CONSTANTS.YEAR_STUDY_LABEL}
          placeholder={ACCOUNT_CONSTANTS.YEAR_STUDY_PLACEHOLDER}
        />
      </Show>

      <Show when={user.role === USER_ROLES.STUDENT}>
        <TextInput
          disabled
          radius='md'
          value={data.field_study}
          icon={<IconAlignJustified size='1rem' />}
          label={ACCOUNT_CONSTANTS.FIELD_STUDY_LABEL}
          placeholder={ACCOUNT_CONSTANTS.FIELD_STUDY_PLACEHOLDER}
        />
      </Show>
    </Flex>
  )
}
