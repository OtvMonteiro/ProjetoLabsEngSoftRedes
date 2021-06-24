import Image from 'next/image'
export default function Footer({ props }) {
  return (
    <div className="flex items-center h-10 text-sm text-gray-600 border-t-2 justify-items-end border-gray">
      <a href="https://github.com/OtvMonteiro/ProjetoLabsEngSoftRedes">
        <Image
          className="flex"
          src="/github.png"
          alt="PCS Logo"
          width="40"
          height="40"
        />
      </a>
      <span>Desenvolvido com 😠 e ☕ </span>
    </div>
  )
}
