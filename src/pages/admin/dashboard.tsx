import { ProjectManager } from '@/presentation/components/pages-components/admin/project-manager'
import { getServerSideProps } from '@/gssp-admin-cookies'

function Dashboard() {
  return (
    <div
      className={'max-w-safeMobile xl:max-w-safeDesktop m-auto min-h-[60vh]'}
    >
      <ProjectManager />
    </div>
  )
}

export default Dashboard

export { getServerSideProps }
