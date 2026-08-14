import {Nav} from '@/app/components/$nav'

function Root({children}: {children: React.ReactNode}) {
  return (
    <header className="Toolbar">
      <div className="ToolbarInner">{children}</div>
    </header>
  )
}

function Actions({children}: {children: React.ReactNode}) {
  return <div className="ToolbarActions">{children}</div>
}

export const Header = {
  Root,
  Nav,
  Actions,
}
