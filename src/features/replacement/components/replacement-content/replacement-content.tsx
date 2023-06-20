import { Flex, Tabs, Title } from '@mantine/core'

import { ReplacementHistory } from 'features/replacement/components/replacement-history/replacement-history'
import { ReplacementSecretary } from 'features/replacement/components/replacement-secretary/replacement-secretary'
import { REPLACEMENT_CONSTANTS } from 'features/replacement/constants/replacement.constants'

export const ReplacementContent = () => {
  return (
    <Flex w='100%' gap={10} direction='column'>
      <Title order={1}>{REPLACEMENT_CONSTANTS.REPLACEMENTS_TITLE}</Title>

      <Tabs mt={20} color='blue' defaultValue='second'>
        <Tabs.List>
          <Tabs.Tab value='first'>{REPLACEMENT_CONSTANTS.REPLACING}</Tabs.Tab>
          <Tabs.Tab value='second' color='blue'>
            {REPLACEMENT_CONSTANTS.REPLACEMENTS}
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value='first' pt='xs'>
          <ReplacementHistory />
        </Tabs.Panel>

        <Tabs.Panel value='second' pt='xs'>
          <ReplacementSecretary />
        </Tabs.Panel>
      </Tabs>
    </Flex>
  )
}
