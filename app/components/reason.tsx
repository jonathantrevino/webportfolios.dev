import React, { ReactNode } from 'react'

type ReasonProps = {
  title: string,
  body: string,
  icon: ReactNode,
  bg_color: string,
  icon_color: string,
}

const Reason = ({ title, body, icon, bg_color, icon_color }: ReasonProps) => {
  return (
    <div className='p-4 border border-[color:#DBDBDB] rounded-lg space-y-3'>
      <div className={`w-full flex justify-center rounded-lg p-6`} style={{ backgroundColor: bg_color, color: icon_color }}>{icon}</div>
      <div className='space-y-1'>
        <h4 className='font-medium text-sm'>{title}</h4>
        <p className='text-sm'>{body}</p>
      </div>
    </div>

  )
}

export default Reason
