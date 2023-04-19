import { TextInput, PasswordInput, Text, Paper, Group, Button, Stack, Box } from '@mantine/core'
import { useForm } from '@mantine/form'

import styles from './auth-content.module.scss'

export const AuthContent = () => {
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
      password: (val) => (val.length <= 6 ? 'Password should include at least 6 characters' : null),
    },
  })

  return (
    <Box className={styles.parent}>
      <Paper className={styles.parentPaper} shadow='xs' p='md' radius='md'>
        <Text size='lg' weight={500}>
          Welcome to TWAOS
        </Text>

        <form
          onSubmit={form.onSubmit(() => {
            console.info('gg')
          })}>
          <Stack>
            <TextInput
              required
              label='Email'
              placeholder='ion.popescu@student.usv.ro'
              value={form.values.email}
              onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
              error={form.errors.email && 'Invalid email'}
              radius='md'
            />

            <PasswordInput
              required
              label='Password'
              placeholder='Your password'
              value={form.values.password}
              onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
              error={form.errors.password && 'Password should include at least 6 characters'}
              radius='md'
            />
          </Stack>

          <Group position='apart' mt='xl'>
            <Button type='submit' radius='md'>
              Login
            </Button>
          </Group>
        </form>
      </Paper>
    </Box>
  )
}
