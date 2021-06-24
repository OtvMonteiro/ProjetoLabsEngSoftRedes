import Header from './Header'
import Footer from './Footer'
import Image from 'next/image'

export default function Layout({ children, title }) {
  //console.log({title},"SDSD")
  const t = title
  return (
    <div className="flex flex-col justify-between h-screen max-w-sm pt-5 mx-auto text-center">
      <Header title={t} />
      <div>{children}</div>
      <div className="flex items-center h-10 text-sm text-gray-600 border-t-2 justify-items-end border-gray">
      <span></span>
    </div>
    </div>
  )
}
