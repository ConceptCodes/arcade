import type { NextPage } from 'next'
import Head from 'next/head'
import GameCard from '../components/gameCard';

interface IGames { 
  title: string
  description: string
  link: string;
  color: string;
  icon: string;
}

const games: IGames[] = [];

games.push({
  title: 'Tic Tac Toe',
  description: 'A simple game of tic tac toe',
  link: '/tic-tac-toe',
  color: 'bg-red-400',
  icon: '⏳'
});

games.push({
  title: 'Memory',
  description: 'A simple game of memory',
  link: '/memory',
  color: 'bg-blue-400',
  icon: '🃏'
});

games.push({
  title: 'Chess',
  description: 'A simple game of chess',
  link: '/chess', 
  color: 'bg-purple-400',
  icon: '♟'
});

games.push({
  title: 'Connect 4',
  description: 'A simple game of connect 4',
  link: '/connect-four',
  color: 'bg-yellow-400',
  icon: '🔴'
})

const Home: NextPage = () => {
  const highlight = 'text-yellow-300';
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
    <Head>
      <title>Arcade</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main className="flex space-y-5 w-full flex-1 flex-col items-center justify-center px-20 text-center">
      <h1 className="text-6xl font-black">
        <span className={highlight}>{'<'}</span>
          Arcade
        <span className={highlight}>{'/>'}</span>
      </h1>
      <section className="flex flex-wrap justify-center mt-6 sm:w-full">
        {games.map((game, index) => (
          <GameCard 
            key={index} 
            color={game.color}
            title={game.title}
            icon={game.icon} 
            description={game.description} 
            link={game.link} />
        ))}
      </section>
    </main>
    </div>
  )
}

export default Home