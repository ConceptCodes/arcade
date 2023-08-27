import { FC } from 'react'
import Link from 'next/link'

interface IGameCardProps {
  title: string
  description: string
  link: string
  color: string
  icon: string
}

const GameCard: FC<IGameCardProps> = ({
  title,
  description,
  icon,
  link,
  color
}) => { 
  const style = `${color} h-16 w-16 mr-3 rounded-md text-4xl align-middle flex items-center justify-center`;
  return (
    <Link href={link}>
      <div className="flex p-3 text-left items-center">
        <figure className={style}>
            {icon}
        </figure>
        <div className="flex flex-col align-left">
          <h3 className="text-xl font-bold">{title}</h3>
          <p className="text-gray-500 text-md">{description}</p>
        </div>
      </div>
    </Link>
  )
}

export default GameCard