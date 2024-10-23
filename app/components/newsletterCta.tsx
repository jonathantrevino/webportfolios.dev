'use client'
import React, { useEffect, useState } from 'react'

const NewsletterCta = () => {
  const [email, setEmail] = useState(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [status, setStatus] = useState<{ success: boolean | null, message: string }>({ success: null, message: '' })
  useEffect(() => {

    setStatus({ success: null, message: '' })
  }, [email])
  async function handleSubscribe(e: any) {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await fetch('https://us-central1-linkfolio-ac5da.cloudfunctions.net/subscribeToNewsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      console.log(data)
      setStatus(data)
    } catch (error) {
      console.error('Error unsubscribing:', error);
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className='flex justify-between items-start md:items-center md:flex-row flex-col gap-5 py-[50px]'>
      <span className='flex-[0.5]'>
        <h3 className='text-lg font-medium text-primary'>Join Our Newsletter</h3>
        <p className='text-sm font-light'>We'll send you updates once per week as development continues. No spam.</p>
      </span>
      <form className='flex flex-[0.5]' onSubmit={(e: any) => handleSubscribe(e)}>
        <input required type='email' placeholder='email@domain.com' className='input input-bordered !rounded-r-none w-full' onChange={(e: any) => { setEmail(e.target.value) }} />
        <button disabled={!email || status.success === false} type='submit' className={`btn ${loading ? 'btn-primary' : status.success === true ? 'btn-success' : status.success === false ? 'btn-error' : 'btn-primary'} btn-md !rounded-l-none`}>{loading ? 'Subscribing' : status.success ? 'Subscribed' : status.success === null && !loading ? 'Subscribe' : 'Failed'}</button>
      </form>
    </div>
  )
}

export default NewsletterCta
