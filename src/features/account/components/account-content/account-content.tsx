import { Container, Flex, TextInput, Title } from '@mantine/core'
import { IconAt, IconUser, IconCoin, IconCalendar, IconAlignJustified } from '@tabler/icons-react'

import { ACCOUNT_CONSTANTS } from 'features/account/constants/account.constants'

export const AccountContent = () => {
  return (
    <Container>
      <Flex gap={10} direction='column'>
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

        <TextInput
          disabled
          radius='md'
          icon={<IconCoin size='1rem' />}
          label={ACCOUNT_CONSTANTS.FINANCIAL_STATUS_LABEL}
          placeholder={ACCOUNT_CONSTANTS.FINANCIAL_STATUS_PLACEHOLDER}
        />

        <TextInput
          disabled
          radius='md'
          icon={<IconCalendar size='1rem' />}
          label={ACCOUNT_CONSTANTS.YEAR_STUDY_LABEL}
          placeholder={ACCOUNT_CONSTANTS.YEAR_STUDY_PLACEHOLDER}
        />

        <TextInput
          disabled
          radius='md'
          icon={<IconAlignJustified size='1rem' />}
          label={ACCOUNT_CONSTANTS.FIELD_STUDY_LABEL}
          placeholder={ACCOUNT_CONSTANTS.FIELD_STUDY_PLACEHOLDER}
        />
      </Flex>
    </Container>
  )
}
