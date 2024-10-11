import React from 'react'
import { ProjectManager } from '@/components/pages/admin/project-manager'

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
