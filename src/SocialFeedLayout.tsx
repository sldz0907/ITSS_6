import React from 'react'
import type { ReactNode } from 'react'

interface SocialFeedLayoutProps {
  leftSidebar?: ReactNode
  centerFeed?: ReactNode
  rightSidebar?: ReactNode
}

export function SocialFeedLayout({
  leftSidebar,
  centerFeed,
  rightSidebar,
}: Readonly<SocialFeedLayoutProps>) {
  return (
    /* rogym-convention-exempt: NO_NONSEMANTIC_TAGS [Responsive 3-column flex container for social feed] */
    <div className="layout">
      {/* Left Column: Shortcuts & Sub-Navigation */}
      <aside id="sidebar" className="card sidebar" aria-label="Lối tắt">
        {leftSidebar}
      </aside>

      {/* Center Column: Create Box, Filter Tabs, Feed Streams */}
      <main id="main" className="main" tabIndex={-1}>
        {centerFeed}
      </main>

      {/* Right Column: Online Study Buddies & Widgets */}
      <aside id="context" className="context" aria-label="Tiến độ và mentor">
        {rightSidebar}
      </aside>
    </div>
  )
}
