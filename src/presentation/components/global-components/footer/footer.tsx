import Image from 'next/image'
import Logo from '../../../../../public/embaixadoras-do-bem-logo.svg'

export function Footer() {
  return (
    <footer className={'bg-[#fafafa] w-full justify-items-center'}>
      <div
        className={
          'max-w-safeMobile lg:max-w-safeDesktop m-auto flex flex-col py-10 items-start gap-10 md:flex-row'
        }
      >
        <div className={'flex flex-col gap-2 lg:flex-row'}>
          <div className={'max-w-[300px]'}>
            <Image src={Logo} alt={'Logo embaixadoras do bem'} />
          </div>

          <div className={`flex flex-col gap-5 max-w-[50ch]`}>
            <p>
              <strong>Embaixadoras do Bem</strong>
            </p>
            <p>
              ONG atuante fundamentalmente em projetos e/ou ações individuais e
              coletivas. Temos diversas campanhas ao longo dos meses, com
              diversos propósitos, mas tendo um objetivo em comum: A prevenção e
              promoção à saúde.
            </p>
          </div>
        </div>

        <div className={`flex flex-col gap-5 `}>
          <p>
            <strong>Leia nosso Blog!</strong>
          </p>
          <p className={'max-w-[50ch]'}>
            Saiba de nossos projetos, tenha informações da causa e fique sabendo
            de notícias relacionadas à saúde!
          </p>
        </div>
      </div>
    </footer>
  )
}
