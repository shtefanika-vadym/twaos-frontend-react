import { Flex, TextInput, Title } from '@mantine/core'
import { IconAlignJustified, IconAt, IconCalendar, IconCoin, IconUser } from '@tabler/icons-react'

import { useAuth } from 'app/hooks'

import { Show } from 'common/components'
import { USER_ROLES } from 'common/constants'

import { ACCOUNT_CONSTANTS } from 'features/account/constants/account.constants'

export const AccountContent = () => {
  const { user } = useAuth()
  return (
    <Flex w='100%' gap={10} direction='column'>
      <Title order={1}>{ACCOUNT_CONSTANTS.ACCOUNT}</Title>
      <TextInput
        disabled
        radius='md'
        icon={<IconAt size='1rem' />}
        label={ACCOUNT_CONSTANTS.EMAIL_LABEL}
        placeholder={ACCOUNT_CONSTANTS.EMAIL_PLACEHOLDER}
      />

      <TextInput
        disabled
        radius='md'
        icon={<IconUser size='1rem' />}
        label={ACCOUNT_CONSTANTS.NAME_LABEL}
        placeholder={ACCOUNT_CONSTANTS.NAME_PLACEHOLDER}
      />

      <Show when={user.role === USER_ROLES.STUDENT}>
        <TextInput
          disabled
          radius='md'
          icon={<IconCoin size='1rem' />}
          label={ACCOUNT_CONSTANTS.FINANCIAL_STATUS_LABEL}
          placeholder={ACCOUNT_CONSTANTS.FINANCIAL_STATUS_PLACEHOLDER}
        />
      </Show>

      <Show when={user.role === USER_ROLES.STUDENT}>
        <TextInput
          disabled
          radius='md'
          icon={<IconCalendar size='1rem' />}
          label={ACCOUNT_CONSTANTS.YEAR_STUDY_LABEL}
          placeholder={ACCOUNT_CONSTANTS.YEAR_STUDY_PLACEHOLDER}
        />
      </Show>

      <Show when={user.role === USER_ROLES.STUDENT}>
        <TextInput
          disabled
          radius='md'
          icon={<IconAlignJustified size='1rem' />}
          label={ACCOUNT_CONSTANTS.FIELD_STUDY_LABEL}
          placeholder={ACCOUNT_CONSTANTS.FIELD_STUDY_PLACEHOLDER}
        />
      </Show>
    </Flex>
  )
}
