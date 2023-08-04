import { Loader } from 'lucide-react'
import ReactPlayer from 'react-player'
import { useCurrentLesson, useStore } from '../zustand-store'

export function Video() {
  const { currentLesson } = useCurrentLesson()

  const { isLoading, next } = useStore(({ isLoading, next }) => ({
    isLoading,
    next,
  }))

  return (
    <>
      <div className="w-full bg-zinc-950 aspect-video">
        {isLoading ? (
          <div className="flex h-full items-center justify-center">
            <Loader className="w-6 h-6 text-zinc-400 animate-spin" />
          </div>
        ) : (
          <>
            {currentLesson && (
              <ReactPlayer
                width="100%"
                height="100%"
                controls
                onEnded={next}
                url={`https://www.youtube.com/watch?v=${currentLesson.id}`}
              />
            )}
          </>
        )}
      </div>
    </>
  )
}
