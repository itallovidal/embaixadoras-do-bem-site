import { Loader2 } from 'lucide-react'

export default function Loader() {
  return (
    <div className={'flex justify-center gap-2 m-auto w-full h-full p-10'}>
      <Loader2 className={'animate-spin'} />
      <p>Carregando...</p>
    </div>
  )
}
