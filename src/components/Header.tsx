import { useCurrentLesson, useStore } from '../zustand-store'

export function Header() {
  const { currentModule, currentLesson } = useCurrentLesson()

  const isLoading = useStore((state) => state.isLoading)

  return (
    <>
      <div className="flex flex-col gap-1">
        {isLoading ? (
          <>
            <div className="w-48 h-8 animate-pulse bg-zinc-700 rounded-lg"></div>
            <div className="w-56 h-6 animate-pulse bg-zinc-700 rounded-lg"></div>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-bold">{currentLesson?.title}</h1>
            <span className="">Módulo &quot;{currentModule?.title}&quot; </span>
          </>
        )}
      </div>
    </>
  )
}
