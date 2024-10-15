import { ProjectManager } from '@/components/pages/admin/project-manager'
import { getServerSideProps } from '@/lib/gssp-admin-cookies'

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
