import { GetServerSideProps } from 'next'
import nookies from 'nookies'

export const getServerSideProps: GetServerSideProps = async (req) => {
  const cookies = nookies.get(req)
  const token = cookies['@EDB:user-token']
  if (!token) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}
